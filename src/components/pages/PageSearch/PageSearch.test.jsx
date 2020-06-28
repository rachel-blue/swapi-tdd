import React from 'react';
import { shallow } from 'enzyme';
import PageSearch from './PageSearch';

const findByTestAttr = (wrapper, testId) => wrapper.find(`[data-test="${testId}"]`);

describe('PageSearch component', () => {
  const spyFetch = jest.spyOn(global, 'fetch');

  beforeEach(() => {
    spyFetch.mockClear();
  });

  const setup = (args = {}) => {
    const defaultArgs = {
      inputVal: 'lorem ipsum',
    };

    const { inputVal } = {
      ...defaultArgs,
      ...args,
    };

    const wrapper = shallow(<PageSearch />);
    const search = findByTestAttr(wrapper, 'p-search__search');
    search.simulate('change', { target: { value: inputVal } });
    wrapper.update();

    return { wrapper };
  };

  it('should render the page', () => {
    const { wrapper } = setup();
    const pageSearch = findByTestAttr(wrapper, 'p-search');

    expect(pageSearch.length).toBe(1);
  });

  describe('form', () => {
    describe('search input', () => {
      it('should fill in text', () => {
        const inputVal = 'unicorn';

        const { wrapper } = setup({ inputVal });
        const searchResult = findByTestAttr(wrapper, 'p-search__search');

        expect(searchResult.get(0).props.value).toEqual(inputVal);
      });

      it('should fill in a different text', () => {
        const inputVal = 'drunk';

        const { wrapper } = setup({ inputVal });
        const searchResult = findByTestAttr(wrapper, 'p-search__search');

        expect(searchResult.get(0).props.value).toEqual(inputVal);
      });
    });

    describe('submission', () => {
      const setupTest = async (args = {}) => {
        const spyPreventDefault = jest.fn();

        const result = setup(args);
        const submit = findByTestAttr(result.wrapper, 'p-search__submit');
        await submit.simulate('submit', { preventDefault: spyPreventDefault });

        return {
          ...result,
          spyPreventDefault,
        };
      };

      it('should submit a request to the api with the search input value', async () => {
        const inputVal = 'unicorn';
        const url = `https://swapi.dev/api/people/?search=${inputVal}`;

        await setupTest({ inputVal });

        expect(spyFetch).toBeCalledWith(url);
      });

      it('should submit a request to the api with a different search input value', async () => {
        const inputVal = 'tentacles';
        const url = `https://swapi.dev/api/people/?search=${inputVal}`;

        await setupTest({ inputVal });

        expect(spyFetch).toBeCalledWith(url);
      });

      it('should prevent default on form submissions', async () => {
        const { spyPreventDefault } = await setupTest();

        expect(spyPreventDefault).toBeCalled();
      });

      it('should not submit if the search input is empty', async () => {
        const inputVal = '';

        await setupTest({ inputVal });

        expect(spyFetch).not.toBeCalled();
      });

      it('should not crash when search input is undefined', async () => {
        const inputVal = undefined;

        await setupTest({ inputVal });

        expect(spyFetch).not.toBeCalled();
      });

      it('should print out the results from the api', async () => {
        const name = 'r2d2';

        const spyJson = jest.fn();
        spyJson.mockReturnValue(Promise.resolve({
          results: [{ name }],
        }));

        spyFetch.mockReturnValue(Promise.resolve({
          json: spyJson,
        }));

        const { wrapper } = await setupTest();
        const nameEl = findByTestAttr(wrapper, 'p-search__name');

        expect(nameEl.text()).toContain(name);
      });

      it('should print out a different result from the api', async () => {
        const name = 'Chewie';

        const spyJson = jest.fn();
        spyJson.mockReturnValue(Promise.resolve({
          results: [{ name }],
        }));

        spyFetch.mockReturnValue(Promise.resolve({
          json: spyJson,
        }));

        const { wrapper } = await setupTest();
        const nameEl = findByTestAttr(wrapper, 'p-search__name');

        expect(nameEl.text()).toContain(name);
      });

      it('should multiple results from the api', async () => {
        const characterA = { name: 'Chewie' };
        const characterB = { name: 'R2' };

        const spyJson = jest.fn();
        spyJson.mockReturnValue(Promise.resolve({
          results: [characterA, characterB],
        }));

        spyFetch.mockReturnValue(Promise.resolve({
          json: spyJson,
        }));

        const { wrapper } = await setupTest();
        const names = findByTestAttr(wrapper, 'p-search__name');

        expect(names.length).toEqual(2);
      });
    });
  });
});

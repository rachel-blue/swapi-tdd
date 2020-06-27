import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('should render the page', () => {
  const wrapper = shallow(<App />);
  const app = wrapper.find('[data-test="app"]');

  expect(app.length).toBe(1);
});

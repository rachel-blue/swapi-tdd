import React, { useState } from 'react';

export default function PageSearch() {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const getData = async () => {
    if (search && search.length > 0) {
      const results = await fetch(`https://swapi.dev/api/people/?search=${search}`);
      const response = await results.json();
      const data = response.results;

      setSearchResults(data);
    }
  };

  return (
    <div data-test="p-search">

      <form
        data-test="p-search__submit"
        onSubmit={(evt) => {
          evt.preventDefault();
          return getData();
        }}
      >
        <input
          data-test="p-search__search"
          type="text"
          value={search}
          onChange={(evt) => {
            setSearch(evt.target.value);
          }}
        />

        <button type="submit">
          submit
        </button>
      </form>

      {searchResults.map((character) => (
        <div key={character.name}>
          <h2 data-test="p-search__name">{character.name}</h2>
        </div>
      ))}
    </div>
  );
}

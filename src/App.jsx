import React from 'react';
import './App.css';
import PageSearch from './components/pages/PageSearch/PageSearch';

function App() {
  return (
    <div data-test="app">
      <PageSearch data-test="app__search" />
    </div>
  );
}

export default App;

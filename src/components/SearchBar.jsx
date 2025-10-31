import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Filtrar en tiempo real
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Filter recipes by name... (e.g., tacos, pasta, curry)"
        value={query}
        onChange={handleChange}
        disabled={isLoading}
        className="search-input"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          className="clear-button"
        >
          ✕
        </button>
      )}
    </form>
  );
}

export default SearchBar;

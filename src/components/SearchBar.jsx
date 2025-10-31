import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search vegan recipes... (e.g., tacos, pasta, curry)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
        className="search-input"
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="search-button"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;

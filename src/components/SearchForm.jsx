import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="city-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;

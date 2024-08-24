import React from 'react';

function SearchHistory({ history, onSelectCity }) {
  return (
    <div id="history-container">
      <h3>Search History</h3>
      <ul id="history-list">
        {history.map((city, index) => (
          <li key={index} onClick={() => onSelectCity(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;

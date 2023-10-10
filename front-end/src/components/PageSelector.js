import React from 'react';

function PageSelector({ pages, selectedPages, onSelect }) {
  return (
    <div>
      <h2>Select Pages to Extract:</h2>
      {pages.map((page) => (
        <label key={page}>
          <input
            type="checkbox"
            checked={selectedPages.includes(page)}
            onChange={() => onSelect(page)}
          />
          Page {page}
        </label>
      ))}
    </div>
  );
}

export default PageSelector;

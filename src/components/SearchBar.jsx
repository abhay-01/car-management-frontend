import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex justify-center p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search for cars..."
        className="border p-2 rounded w-1/3"
      />
    </div>
  );
};

export default SearchBar;

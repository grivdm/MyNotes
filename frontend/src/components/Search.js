import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="searchbar">
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="searchbar-input"
        placeholder="  Search note"
        name="s"
        autoComplete="off"
      />
      {searchQuery ? (
        <button className="clear-button" onClick={resetSearch}>
          X
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;

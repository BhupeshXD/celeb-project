import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../App.css";

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <span className="search-icon">
          <AiOutlineSearch />
        </span>
        <input type="text" placeholder="Search user" onChange={onChange} />
      </div>
    </div>
  );
};

export default SearchBar;

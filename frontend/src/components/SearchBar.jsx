import { useState } from "react";
import { Input, Button } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <Search
          placeholder="Search for a product (e.g., iPhone 14)"
          enterButton="Compare Prices"
          size="large"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default SearchBar;

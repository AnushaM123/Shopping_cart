

function Search({
  searchText,
  handleTextSearch,
  categorySearch,
  handleCategorySearch,
  priceSearch,
  handlePriceSearch,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="search here..."
        value={searchText}
        onChange={handleTextSearch}
      />

      <select value={categorySearch} onChange={handleCategorySearch}>
        <option>All</option>
        <option>Fruits</option>
        <option>Vegetables</option>
        <option>Dairy</option>
        <option>Bakery</option>
      </select>

      <select value={priceSearch} onChange={handlePriceSearch}>
        <option>None</option>
        <option>Low to High</option>
        <option>High to Low</option>
      </select>
    </div>
  );
}

export default Search;
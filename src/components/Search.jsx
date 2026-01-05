

function Search({
  searchText,
  handleTextSearch,
  categorySearch,
  handleCategorySearch,
  priceSearch,
  handlePriceSearch,
}) {
  return (
    <div className="my-6 flex justify-evenly">
      <input className="border border-yellow-900 rounded-xl p-2 w-64"
        type="text"
        placeholder="search here..."
        value={searchText}
        onChange={handleTextSearch}
      />

      <select className="border border-yellow-900 rounded-xl p-2" value={categorySearch} onChange={handleCategorySearch}>
        <option>All</option>
        <option>Fruits</option>
        <option>Vegetables</option>
        <option>Dairy</option>
        <option>Bakery</option>
      </select>

      <select className="border border-yellow-900 p-2 rounded-xl" value={priceSearch} onChange={handlePriceSearch}>
        <option>None</option>
        <option>Low to High</option>
        <option>High to Low</option>
      </select>
    </div>
  );
}

export default Search;
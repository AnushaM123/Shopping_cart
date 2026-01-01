function FilterList({ priceFilteredList, onAddItems }) {
  return (
    <ul>
      {priceFilteredList.map((item) => (
        <li key={item.id}>
          <span>
            {" "}
            {item.name} - {item.category} - ${item.price}{" "}
          </span>
          <button onClick={() => onAddItems(item)}>Add</button>
        </li>
      ))}
    </ul>
  );
}

export default FilterList;
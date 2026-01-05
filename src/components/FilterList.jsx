function FilterList({ priceFilteredList, onAddItems }) {
  return (
    <ul className="flex flex-wrap gap-4">
      {priceFilteredList.map((item) => (
        <li key={item.id} >
          <div className="flex flex-col justify-center items-center border border-yellow-900 w-32 h-32 gap-1.5 rounded-xl ">
            <h2 className="font-bold">{item.name}</h2>
            <h4>{item.category}</h4>
            <h3>${item.price}</h3>
            <button className="bg-yellow-900 text-white py-1 px-2 rounded-xl" onClick={() => onAddItems(item)}>Add</button>
          </div>
          
        </li>
      ))}
    </ul>
  );
}

export default FilterList;
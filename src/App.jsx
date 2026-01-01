import React, { useState, useCallback } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { usePersistCart } from "./hooks/usePersistCart";

// const products = [
//   { id: 1, name: "Apple", category: "Fruits", price: 30 },
//   { id: 2, name: "Banana", category: "Fruits", price: 10 },
//   { id: 3, name: "Carrot", category: "Vegetables", price: 40 },
//   { id: 4, name: "Beetroot", category: "Vegetables", price: 20 },
//   { id: 5, name: "Milk", category: "Dairy", price: 30 },
//   { id: 6, name: "Curd", category: "Dairy", price: 50 },
//   { id: 7, name: "Bread", category: "Bakery", price: 40 },
// ];

function App() {
  const [categorySearch, setCategorySearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");

  const { products, Loading, error } = useFetch();
  const { searchText, setSearchText, debouncedSearch } = useLocalStorage();
  const { cartItems, setCartItems } = usePersistCart();

  const handleTextSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategorySearch = (e) => {
    setCategorySearch(e.target.value);
  };

  const handlePriceSearch = (e) => {
    setPriceSearch(e.target.value);
  };

  const filteredList = products.filter((product) => {
    const matchestext = product.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesCategory =
      categorySearch === "" || categorySearch == "All"
        ? true
        : product.category === categorySearch;

    return matchestext && matchesCategory;
  });

  const priceFilteredList = [...filteredList].sort((a, b) => {
    if (priceSearch === "Low to High") return a.price - b.price;
    if (priceSearch === "High to Low") return b.price - a.price;
    return 0;
  });

  const handleAddItems = useCallback(
    (product) => {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);

        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });
    },
    [setCartItems]
  );

  const handleIncrement = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    },
    [setCartItems]
  );

  const handleDecrement = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    [setCartItems]
  );

  const handleDeleteItem = useCallback(
    (id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setCartItems]
  );

  const handleClear = () => {
    setCartItems([]);
  };

  return (
    <>
      <Search
        searchText={searchText}
        handleTextSearch={handleTextSearch}
        categorySearch={categorySearch}
        handleCategorySearch={handleCategorySearch}
        priceSearch={priceSearch}
        handlePriceSearch={handlePriceSearch}
      />
      <FilterList
        priceFilteredList={priceFilteredList}
        onAddItems={handleAddItems}
      />
      <Cart
        cartItems={cartItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDeleteItem={handleDeleteItem}
        onClearCart={handleClear}
        Loading={Loading}
        error={error}
      />
      <Stats cartItems={cartItems} />
    </>
  );
}

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

const Cart = React.memo(function Cart({
  cartItems,
  onIncrement,
  onDecrement,
  onDeleteItem,
  onClearCart,
  Loading,
  error,
}) {
  return (
    <>
      {Loading && <Load />}
      {!Loading && error && <p>{error}</p>}

      {!Loading &&
        !error &&
        (cartItems.length > 0 ? (
          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onDeleteItem={onDeleteItem}
                  key={item.id}
                />
              ))}
            </ul>
            <button onClick={onClearCart}>Clear</button>
          </div>
        ) : (
          <p>Add items to your cart</p>
        ))}
    </>
  );
});

function Load() {
  return <p>Loading...!!!</p>;
}

const CartItem = React.memo(function CartItem({
  item,
  onIncrement,
  onDecrement,
  onDeleteItem,
}) {
  return (
    <li key={item.id}>
      <div>
        <span>
          {item.name} - ${item.price * item.quantity} - {item.category}
        </span>
        <button
          onClick={() => onIncrement(item.id)}
          disabled={item.quantity === 10}
        >
          +
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => onDecrement(item.id)}
          disabled={item.quantity === 0}
        >
          -
        </button>
        <button onClick={() => onDeleteItem(item.id)}>&times;</button>
      </div>
    </li>
  );
});

const Stats = React.memo(function Stats({ cartItems }) {
  const total = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const tax = total * 0.1;

  return (
    <div>
      <h3>Total: ${total}</h3>
      <h3>Tax : ${tax}</h3>
      <h3>Grand Total : ${total + tax}</h3>
    </div>
  );
});

export default App;

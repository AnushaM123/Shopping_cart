import React, { useState, useCallback } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { usePersistCart } from "./hooks/usePersistCart";
import Search from "./components/Search.jsx";
import FilterList from "./components/FilterList.jsx";
import Cart from "./components/Cart.jsx";
import Stats from "./components/Stats.jsx";

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
const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => {
    setShowCart(prev => !prev);
  };
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
      categorySearch === "" || categorySearch === "All"
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
              : item,
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });
    },
    [setCartItems],
  );

  const handleIncrement = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    },
    [setCartItems],
  );

  const handleDecrement = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [setCartItems],
  );

  const handleDeleteItem = useCallback(
    (id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setCartItems],
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
        showCart={showCart}
        onShowCart={handleShowCart}
      />
      <Stats cartItems={cartItems} showCart={showCart} onShowCart={handleShowCart} />
    </>
  );
}

export default App;

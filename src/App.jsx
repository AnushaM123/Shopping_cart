import { useEffect, useState } from "react";
import "./App.css";

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
  const [products, setProducts] = useState([]); //state to store all products fetched from api

  const [Loading, setLoading] = useState(false); // state to show loading while api is fetching data

  const [error, setError] = useState(""); // state to show error messages
   const [searchText, setSearchText] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [debouncedSearch, setDebouncedSearch] = useState('');

  //code to fetch products data from api

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://694d1791ad0f8c8e6e1fb5a9.mockapi.io/api/v1/items"
        );

        if (!res.ok)
          throw new Error(
            "Something went wrong!! unable to fetch the products"
          );

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // creating presistance of searchText using useEffect hook, operations on localstorage is a sideEffect, so we need useeffect


// useEffect to set item to local-storage, we have serachText state inside dependency array, because we want to set to localstorage on every searchText state change
//sync state to browser storage    
useEffect(() => {
    if(debouncedSearch) {localStorage.setItem('searchText', debouncedSearch);}
    
    console.log(`${debouncedSearch} is set to localstorage`)
  }, [debouncedSearch]);

  //useEffect to getItem from local-storage
  //dependency array is empty, because we want to run this effect only on mount
  useEffect(() => {
    const savedText = localStorage.getItem('searchText');
    if(savedText) {
     setSearchText(savedText)
    }
    console.log(`${savedText} is retrived from local storage`)
  }, [])

  //I use useEffect with a cleanup function to debounce user input. When the input changes, the previous timer is cleared and a new one is created, ensuring the side effect only runs after the user stops typing.

  useEffect(() => {
    console.log("Debounce started");
    const timedId = setTimeout(() => {
      console.log("Debounce fineshed");
      setDebouncedSearch(searchText);
    }, 500);

    return () => {clearTimeout(timedId)
      console.log("clean-up -> clear timer");
    }
  }, [searchText])

  useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      console.log("cartItems set to localstorage")
  },[cartItems])

  // useEffect(() => {
  //   const savedCartItems = localStorage.getItem('cartItems');
  //   if(savedCartItems) {
  //     setCartItems( JSON.parse( savedCartItems ) )
  //   }
  //   console.log("cartItems retrived from localstorage")
  // },[])

 

  // const handleTextSearch = (e) => {
  //   setSearchText(e.target.value);
  // };

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

  const handleAddItems = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleIncrement = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    setCartItems([]);
  };

  return (
    <>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
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
  setSearchText,
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
        onChange={(e) => setSearchText(e.target.value)}
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

function Cart({
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
}

function Load() {
  return (
    <p>Loading...!!!</p>
  );
}
function CartItem({ item, onIncrement, onDecrement, onDeleteItem }) {
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
}

function Stats({ cartItems }) {
  const total = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const tax = total * 0.1;

  return (
    <div>
      <h3>Total: ${total}</h3>
      <h3>Tax : ${tax}</h3>
      <h3>Grand Total : ${total + tax}</h3>
    </div>
  );
}

export default App;

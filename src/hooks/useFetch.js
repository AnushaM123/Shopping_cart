import { useState, useEffect } from "react";

export function useFetch() {
  const [products, setProducts] = useState([]); //state to store all products fetched from app
  const [Loading, setLoading] = useState(false); // state to show loading while api is fetching data
  const [error, setError] = useState(""); // state to show error messages

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

  return { products, Loading, error };
}

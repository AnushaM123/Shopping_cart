import {useState, useEffect} from 'react'

export function usePersistCart() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        console.log("cartItems set to localstorage")
    },[cartItems])

    return {cartItems, setCartItems}
}
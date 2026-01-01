import React from "react";
import CartItem from "./CartItem.jsx";
import Load from "./Load.jsx";

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

export default Cart;
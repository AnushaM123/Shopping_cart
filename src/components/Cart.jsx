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
  showCart,
  onShowCart
}) {

  

  return (
    <>
      <button className="bg-yellow-900 text-center text-white py-1 px-2 rounded-xl w-32 mt-10 center-al" onClick={onShowCart}>{showCart ? "Close Cart" : "Open Cart"}</button>
      {Loading && <Load />}
      {!Loading && error && <p>{error}</p>}

      {!Loading &&
        !error && showCart && (
          <>
            
            {cartItems.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <ul className="flex flex-wrap gap-4 mt-6">
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
                <button className="bg-yellow-900 text-yellow-100 py-1 px-2 rounded-xl w-32  mt-10" onClick={onClearCart}>Clear</button>
              </div>
            ) : (
              <p className=" mt-4">Add items to your cart</p>
            )}
          </>
        )}
    </>
  );
});



export default Cart;
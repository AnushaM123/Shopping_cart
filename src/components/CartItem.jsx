import React from "react";

const CartItem = React.memo(function CartItem({
  item,
  onIncrement,
  onDecrement,
  onDeleteItem,
}) {
  return (
    <li key={item.id} className="w-32 h-32">
      <div className="flex flex-col justify-center items-center border border-yellow-900 gap-1.5 rounded-xl ">
        <div className="flex font-bold">
<button onClick={() => onDeleteItem(item.id)}>&times;</button>
        </div>
        
        <h2 className="font-bold">{item.name}</h2>
        <h3>{item.category}</h3>
        <h3>${item.price * item.quantity}</h3>
        
        <span className="flex gap-8 items-center">
        <button
          onClick={() => onIncrement(item.id)}
          disabled={item.quantity === 10}
          className="font-semibold"
        >
          +
        </button>
        {item.quantity}
        <button
          onClick={() => onDecrement(item.id)}
          disabled={item.quantity === 0}
          className="font-semibold"
        >
          -
        </button>
        </span>
        </div>
        
     
    </li>
  );
});

export default CartItem;
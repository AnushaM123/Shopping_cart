import React from "react";

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

export default CartItem;
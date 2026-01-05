import React from "react";

const Stats = React.memo(function Stats({ cartItems, showCart  }) {
  const total = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const tax = total * 0.1;

  return ( showCart &&
    <div className="mt-6">
      <h3>Total: ${total}</h3>
      <h3>Tax : ${tax}</h3>
      <h3 className="font-bold">Grand Total : ${total + tax}</h3>
    </div>
  );
});

export default Stats;
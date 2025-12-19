import React from 'react';

const Checkout = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="px-24 py-10">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex border p-4 rounded-lg h-32">
            <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded" />
            <div className="flex-1 ml-4 flex flex-col justify-between">
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 font-bold text-xl">Total: ${totalPrice}</div>
    </div>
  );
};

export default Checkout;

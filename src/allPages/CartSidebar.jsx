import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ cartItems, setCartOpen, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.offerAvailable
      ? (item.price * (100 - item.discountPercent)) / 100
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
      {/* Background blur */}
      <div
        className="fixed inset-0 backdrop-blur-[2px] z-40"
        onClick={() => setCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-2xl p-6 z-50 overflow-hidden rounded-l-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>

        {/* Scrollable items */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-5">
          {cartItems.map((item) => {
            const itemPrice = item.offerAvailable
              ? ((item.price * (100 - item.discountPercent)) / 100).toFixed(2)
              : item.price.toFixed(2);

            return (
              <div
                key={item.id}
                className="flex items-center justify-between border p-2 rounded-lg h-32"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded"
                />

                <div className="flex-1 ml-4 flex flex-col justify-between">
                  <h3 className="font-bold text-lg">{item.title}</h3>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p>Price: ${(itemPrice * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 font-bold text-xl">Total: ${totalPrice.toFixed(2)}</div>

        {/* Checkout Button */}
        <button
          className="mt-4 px-4 py-2 rounded-lg border-2 font-bold 
            bg-[#f7f5f4] border-[#664932] text-[#664932]
            transition-all duration-300 hover:bg-[#664932] hover:text-[#f7f5f4]"
          onClick={() => {
            setCartOpen(false);
            navigate("/checkout");
          }}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartSidebar;

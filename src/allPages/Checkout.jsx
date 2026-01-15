import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = ({ cartItems, removeFromCart, setCartItems }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cashOnDelivery",
  });

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.offerAvailable
      ? (item.price * (100 - item.discountPercent)) / 100
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const { name, address, phone, paymentMethod } = formData;

    if (!name || !address || !phone) {
      toast.error("Please fill all fields!");
      return;
    }

    if (paymentMethod === "cashOnDelivery") {
      toast.success("Order placed successfully!");
      setCartItems([]); // clear cart
      navigate("/"); // go home
    } else {
      toast.info("Pre-order placed. Payment will be collected online.");
    }
  };

  if (cartItems.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartItems.map((item) => {
          const itemPrice = item.offerAvailable
            ? ((item.price * (100 - item.discountPercent)) / 100).toFixed(2)
            : item.price.toFixed(2);
          return (
            <div
              key={item.id}
              className="flex border p-4 rounded-lg shadow-lg items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-32 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.author}</p>
                <p className="font-bold mt-2">
                  Price: ${itemPrice} x {item.quantity} = $
                  {(itemPrice * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>

      {/* Form */}
      <div className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div>
          <label className="mr-4">
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={formData.paymentMethod === "cashOnDelivery"}
              onChange={handleChange}
              className="mr-1"
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="preOrder"
              checked={formData.paymentMethod === "preOrder"}
              onChange={handleChange}
              className="mr-1"
            />
            Pre-order
          </label>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="px-6 py-3 bg-[#664932] text-white font-bold rounded-lg hover:opacity-90 transition-all"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;

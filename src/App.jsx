import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartSidebar from "./allPages/CartSidebar";

function App() {
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });

    toast.success(`${book.title} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
  };

  // Update quantity
  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar cartItems={cartItems} setCartOpen={setCartOpen} />

      {/* Main Routes */}
      <main className="pt-24">
        <Main
          addToCart={addToCart}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      {cartOpen && (
        <CartSidebar
          cartItems={cartItems}
          setCartOpen={setCartOpen}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;

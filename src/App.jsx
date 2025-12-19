import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartSidebar from './allPages/CartSidebar';

function App() {
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Add item to cart
  const addToCart = (book) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });

    // Toast notification
    toast.success(`${book.title} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
  };

  // Update quantity
  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return; // minimum 1
    setCartItems(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <>
      <BrowserRouter>
        <nav>
          <Navbar
            cartItems={cartItems}
            setCartOpen={setCartOpen}
          />
        </nav>

        <main className="pt-24"> {/* Adjust for fixed navbar */}
          <Main addToCart={addToCart} cartItems={cartItems} />
        </main>

        <footer>
          <Footer />
        </footer>

        {/* Cart Sidebar */}
        {cartOpen && (
          <CartSidebar
            cartItems={cartItems}
            setCartOpen={setCartOpen}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        )}

        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
}

export default App;

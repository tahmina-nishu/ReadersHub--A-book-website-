import { Route, Routes } from "react-router-dom";
import Home from "../allPages/Home";
import BuyBooks from "../allPages/BuyBooks";
import Genres from "../allPages/Genres";
import OnlineReads from "../allPages/OnlineReads";
import Checkout from "../allPages/Checkout";

const Main = ({ addToCart, cartItems, removeFromCart, clearCart }) => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buybooks" element={<BuyBooks addToCart={addToCart} />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/onlinereads" element={<OnlineReads />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;

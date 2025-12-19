import { Route, Routes } from "react-router-dom";
import Home from "../allPages/Home";
import BuyBooks from "../allPages/BuyBooks";
import Genres from "../allPages/Genres";
import OnlineReads from "../allPages/OnlineReads";

const Main = ({ addToCart }) => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buybooks" element={<BuyBooks addToCart={addToCart} />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/onlinereads" element={<OnlineReads />} />
      </Routes>
    </div>
  );
};

export default Main;

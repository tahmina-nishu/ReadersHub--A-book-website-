import { Route, Routes } from "react-router";
import Home from "../allPages/Home";
import BuyBooks from "../allPages/BuyBooks";
import Genres from "../allPages/Genres";
import OnlineReads from "../allPages/OnlineReads";


const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/buybooks" element={<BuyBooks></BuyBooks>}></Route>
                <Route path="/genres" element={<Genres></Genres>}></Route>
                <Route path="/onlinereads" element={<OnlineReads></OnlineReads>}></Route>
            </Routes>
        </div>
    );
};

export default Main;
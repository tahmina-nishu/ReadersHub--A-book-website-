import React from 'react';
import { Route, Routes } from 'react-router';
import BuyBooks from '../BuyBooks/BuyBooks';
import Genres from '../Genres/Genres';
import ReadOnline from '../ReadOnline/ReadOnline';

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/buyBooks' element={<BuyBooks></BuyBooks>}></Route>
                <Route path='/genres' element={<Genres></Genres>}></Route>
                <Route path='/readOnline' element={<ReadOnline></ReadOnline>}></Route>
            </Routes>
        </div>
    );
};

export default Main;
import React, { useEffect, useState } from 'react';
import BuyBook from './BuyBook';

const BuyBooks = ({ addToCart }) => {
  const [sellingbooks, setSellingbooks] = useState([]);

  useEffect(() => {
    fetch("/sellingBooks.json")
      .then((response) => response.json())
      .then((data) => setSellingbooks(data));
  }, []);

  return (
    <div className="py-10 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
      {sellingbooks.map((sellingbook) => (
        <BuyBook key={sellingbook.id} sellingbook={sellingbook} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default BuyBooks;

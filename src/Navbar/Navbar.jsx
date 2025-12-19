import { Menu, ShoppingCart, UserRoundPen } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ cartItems, setCartOpen }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Buy Books", path: "/buybooks" },
    { name: "Read Online", path: "/onlinereads" },
    { name: "Genres", path: "/genres" }
  ];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='bg-[#d8c8b9] fixed top-0 left-0 w-full z-50 shadow-md'>
      <div className='flex items-center justify-between h-24 px-6'>

        <div>
          <img className='h-16' src="/logo.png" alt="logo" />
        </div>

        <div className='gap-10 flex text-[#56361d] font-semibold items-center text-[20px]'>
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg transition-all duration-300 
                hover:bg-[#664932] hover:text-[#d8c8b9] 
                ${isActive ? "bg-[#664932] text-[#d8c8b9]" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className='flex gap-6 items-center relative'>
          <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>

          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart color="#5a3c1e" size={36} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>

          <UserRoundPen color="#5a3c1e" size={36} />
          <Menu color="#5a3c1e" size={36} />
        </div>

      </div>
    </div>
  );
};

export default Navbar;

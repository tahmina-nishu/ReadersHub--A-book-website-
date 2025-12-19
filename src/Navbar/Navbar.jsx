import { Menu, ShoppingCart, UserRoundPen } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {

    const links = [
        { name: "Home", path: "/" },
        { name: "Buy Books", path: "/buybooks" },
        { name: "Read Online", path: "/onlinereads" },
        { name: "Genres", path: "/genres" }
    ];

    return (
        <div className='bg-[#d8c8b9]'>
        <div className='flex items-center justify-between h-24 px-6'>

            {/* Logo */}
            <div>
            <img className='h-16' src="/public/logo.png" alt="logo" />
            </div>

            {/* Navbar menu */}
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

            <div className='flex gap-6'>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" required placeholder="Search" />
                </label>
                <ShoppingCart color="#5a3c1e" size={36}></ShoppingCart>
                <UserRoundPen color="#5a3c1e" size={36}></UserRoundPen>
                <Menu color="#5a3c1e" size={36}></Menu>
            </div>

        </div>
        </div>
    );
};

export default Navbar;

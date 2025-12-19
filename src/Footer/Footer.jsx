import { Facebook, Twitter, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
return (
    <div className="mt-10">
        <footer className="relative text-[#291504] px-32 py-20 bg-cover bg-center bg-no-repeat shadow-inner"
  style={{
    backgroundImage: "url('/footer-bg.jpg')"}}>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            
            <nav>
                <h6 className="footer-title text-[#1d0e01] font-bold mb-3">Services</h6>
                <div className="flex flex-col gap-2">
                <a className="link link-hover">Read Online</a>
                <a className="link link-hover">Buy Books</a>
                <a className="link link-hover">Book Reviews</a>
                <a className="link link-hover">Wishlist</a>
                </div>
            </nav>

            <nav>
                <h6 className="footer-title text-[#1d0e01] font-bold mb-3">Company</h6>
                <div className="flex flex-col gap-2">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">FAQ</a>
                </div>
            </nav>

            <nav>
                <h6 className="footer-title text-[#1d0e01] font-bold mb-3">Legal</h6>
                <div className="flex flex-col gap-2">
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
                </div>
            </nav>

            
<nav>
  <h6 className="footer-title font-bold mb-3 text-lg">Social</h6>
  <div className="flex gap-3 mt-1">
    <a className="flex items-center justify-center w-10 h-10 bg-[#664932] rounded-full transform transition-transform duration-300 hover:-translate-y-1 hover:scale-110">
      <Twitter color="#d8c8b9" size={20} />
    </a>
    <a className="flex items-center justify-center w-10 h-10 bg-[#664932] rounded-full transform transition-transform duration-300 hover:-translate-y-1 hover:scale-110">
      <Youtube color="#d8c8b9" size={20} />
    </a>
    <a className="flex items-center justify-center w-10 h-10 bg-[#664932] rounded-full transform transition-transform duration-300 hover:-translate-y-1 hover:scale-110">
      <Facebook color="#d8c8b9" size={20} />
    </a>
  </div>
</nav>


            </div>
        </footer>

        
        <footer className="footer sm:footer-horizontal footer-center bg-[#664932] text-[#d8c8b9] p-4">
            <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by Readers Hub
            </p>
        </footer>
        </div>
    );
};

export default Footer;

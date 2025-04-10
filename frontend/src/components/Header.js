import React, { Profiler, useState } from 'react';
import { Menu, X, Home, Package, User, ShoppingBasket, ShoppingCart } from 'lucide-react'; // Added Home and Package icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center">
          <span className="text-xl mr-2">🍃</span>
          <h1 className="text-xl font-bold">FreshOrganics</h1>
        </div>

        {/* Hamburger Button (Visible on Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-green-700 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out z-40`}
        >
          <li className="md:mb-0 mb-2">
            <a href="#home" className="hover:text-green-300 block flex items-center">
              <Home className="h-5 w-5 mr-2 md:hidden" /> {/* Home icon, hidden on desktop */}
              Home
            </a>
          </li>
          {/* <li className="md:mb-0 mb-2">
            <a href="#how-it-works" className="hover:text-green-300 block">
              How It Works
            </a>
          </li> */}
          {/* <li className="md:mb-0 mb-2">
            <a href="#products" className="hover:text-green-300 block">
              Products
            </a>
          </li> */}
          <li className="md:mb-0 mb-2">
            <a href="#subscriptions" className="hover:text-green-300 block flex items-center">
              <Package className="h-5 w-5 mr-2 md:hidden" /> {/* Subscriptions icon, hidden on desktop */}
              Subscriptions
            </a>
          </li>
          <li className="md:mb-0 mb-2">
            <a href="#cart" className="hover:text-green-300 block flex items-center">
              <span className="mr-2 text-white">
              <ShoppingCart className="h-5 w-5 mr-2 md:hidden" />
              </span> Cart
            </a>
          </li>
          <li className="md:mb-0 mb-2">
            <a href="#profile" className="hover:text-green-300 block flex items-center">
              <span className="mr-2 text-white">
              <User className="h-5 w-5 mr-2 md:hidden" />
                </span> Profile
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
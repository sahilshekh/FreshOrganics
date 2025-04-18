import React, { useState } from 'react';
import { Menu, X, Home, Package, User, ShoppingCart } from 'lucide-react';

const Header = ({ ProtectedLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle link clicks and close the menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };

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
            <ProtectedLink
              to="/"
              className="hover:text-green-300 block flex items-center"
              onClick={handleLinkClick}
            >
              <Home className="h-5 w-5 mr-2 md:hidden" />
              Home
            </ProtectedLink>
          </li>
          <li className="md:mb-0 mb-2">
            <ProtectedLink
              to="/subscriptions"
              className="hover:text-green-300 block flex items-center"
              onClick={handleLinkClick}
            >
              <Package className="h-5 w-5 mr-2 md:hidden" />
              Subscriptions
            </ProtectedLink>
          </li>
          <li className="md:mb-0 mb-2">
            <ProtectedLink
              to="/about"
              className="hover:text-green-300 block flex items-center"
              onClick={handleLinkClick}
            >
              <Package className="h-5 w-5 mr-2 md:hidden" />
              About
            </ProtectedLink>
          </li>
          <li className="md:mb-0 mb-2">
            <ProtectedLink
              to="/cart"
              className="hover:text-green-300 block flex items-center"
              onClick={handleLinkClick}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span className="md:hidden">Cart</span>
            </ProtectedLink>
          </li>
          <li className="md:mb-0 mb-2">
            <ProtectedLink
              to="/profile"
              className="hover:text-green-300 block flex items-center"
              onClick={handleLinkClick}
            >
              <User className="h-5 w-5 mr-2" />
              <span className="md:hidden">Profile</span>
            </ProtectedLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
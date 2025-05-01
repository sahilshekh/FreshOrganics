import React, { useState, useContext, useEffect } from 'react';
import { Menu, X, Home, Package, User, ShoppingCart, Building2 } from 'lucide-react';
import { CartContext } from './CartContext';
import logoImage from "./images/whiteLogo.png";

const Header = ({ ProtectedLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItemCount } = useContext(CartContext);
  const [bannerVisible, setBannerVisible] = useState(!sessionStorage.getItem('mangoBannerClosed'));

  // Update banner visibility state when sessionStorage or custom event changes
  useEffect(() => {
    const handleStorageChange = () => {
      setBannerVisible(!sessionStorage.getItem('mangoBannerClosed'));
    };

    const handleBannerClosed = () => {
      setBannerVisible(false); // Update state when banner is closed
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    // Listen for custom bannerClosed event
    window.addEventListener('bannerClosed', handleBannerClosed);

    // Initial check
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bannerClosed', handleBannerClosed);
    };
  }, []);

  // Function to handle link clicks and close the menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo Section */}
        <ProtectedLink to="/mango-varieties" onClick={handleLinkClick}>
          <div className="flex items-center">
            <img src={logoImage} className="w-8 h-8 sm:w-10 sm:h-10" alt="FreshOrganics Logo" />
            <h1 className="text-xl font-bold">OnlyFams</h1>
          </div>
        </ProtectedLink>

        {/* Right Section: Cart (Mobile) and Hamburger Button */}
        <div className="flex items-center space-x-4">
          {/* Cart Link (Visible on Mobile) */}
          <ProtectedLink
            to="/cart"
            className="md:hidden text-white hover:text-green-300 flex items-center navbar-cart relative"
            onClick={handleLinkClick}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </ProtectedLink>

          {/* Hamburger Button (Visible on Mobile) */}
          <button
            className="md:hidden text-white focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:space-x-6 absolute md:static ${
            bannerVisible ? 'top-[10rem]' : 'top-16'
          } left-0 w-full md:w-auto bg-green-700 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out z-40`}
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
              <Building2 className="h-5 w-5 mr-2 md:hidden" />
              About
            </ProtectedLink>
          </li>
          <li className="md:mb-0 mb-2 hidden md:flex">
            <ProtectedLink
              to="/cart"
              className="hover:text-green-300 block flex items-center relative"
              onClick={handleLinkClick}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
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
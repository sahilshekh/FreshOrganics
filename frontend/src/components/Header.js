import React from 'react';

const Header = () => {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl mr-2">🍃</span>
        <h1 className="text-xl font-bold">FreshOrganics</h1>
      </div>
      <ul className="flex space-x-6">
        <li><a href="#home" className="hover:text-green-300">Home</a></li>
        <li><a href="#how-it-works" className="hover:text-green-300">How It Works</a></li>
        <li><a href="#products" className="hover:text-green-300">Products</a></li>
        <li><a href="#subscriptions" className="hover:text-green-300">Subscriptions</a></li>
        <li><span className="hover:text-green-300">🛒</span></li>
        <li><span className="hover:text-green-300">👤</span></li>
      </ul>
    </nav>
  );
};

export default Header;
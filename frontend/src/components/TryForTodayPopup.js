import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';

// Mock product data
const allProducts = [
  { id: 1, name: 'Organic Tomatoes', price: 4.99, image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469' },
  { id: 2, name: 'Organic Cucumbers', price: 2.99, image: 'https://images.unsplash.com/photo-1449300071707-507f48d1832b' },
  { id: 3, name: 'Organic Avocados', price: 5.99, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578' },
  { id: 4, name: 'Organic Strawberries', price: 6.49, image: 'https://images.unsplash.com/photo-1593107998601-27e5e2c49676' },
  { id: 5, name: 'Organic Spinach', price: 3.49, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0TLQ-TatGslPnS8LwNMnQzkymUZI3Q-_-gw&s' },
  { id: 6, name: 'Organic Carrots', price: 2.49, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37' },
];

const TryForTodayPopup = ({ isOpen, onClose, onAddBundleToCart }) => {
  const [specialProducts, setSpecialProducts] = useState([]);

  // Select 3 random products when popup opens
  useEffect(() => {
    if (isOpen) {
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      setSpecialProducts(shuffled.slice(0, 3));
    }
  }, [isOpen]);

  // Calculate total bundle price
  const totalBundlePrice = specialProducts
    .reduce((total, product) => total + product.price, 0)
    .toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Popup Content */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
          Today's Special Bundle
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enjoy this curated selection of organic delights for today only!
        </p>
        <div className="space-y-4">
          {specialProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Bundle Price and Add to Cart Button */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Bundle Price: ${totalBundlePrice}
          </p>
          <button
            onClick={() => onAddBundleToCart(specialProducts)}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add Today's Bundle to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryForTodayPopup;
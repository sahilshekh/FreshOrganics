import React, { useState, useEffect, useContext } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { CartContext } from './CartContext';

// Mock product data (consistent with Products component where possible)
const allProducts = [
  { id: 1, name: 'Organic Tomatoes', price: 20, image: 'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg?w=600&q=60' },
  { id: 2, name: 'Fresh Spinach', price: 15, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Organic Carrots', price: 25, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Bell Peppers', price: 10, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Organic Cucumbers', price: 7, image: 'https://images.unsplash.com/photo-1449300071707-507f48d1832b' },
  { id: 6, name: 'Organic Avocados', price: 35, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578' },
];

const TryForTodayPopup = ({ isOpen, onClose, onAddBundleToCart }) => {
  const { addBundleToCart } = useContext(CartContext);
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

  // Handle adding bundle to cart
  const handleAddBundle = () => {
    addBundleToCart(specialProducts);
    onAddBundleToCart(specialProducts);
    onClose();
  };

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
                <p className="text-gray-600">₹{product.price.toFixed(2)}/ kg</p>
              </div>
            </div>
          ))}
        </div>
        {/* Bundle Price and Add to Cart Button */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Bundle Price: ₹{totalBundlePrice}
          </p>
          <button
            onClick={handleAddBundle}
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
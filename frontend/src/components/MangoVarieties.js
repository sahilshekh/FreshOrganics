import React, { useState } from 'react';

const MangoVarieties = () => {
  console.log('MangoVarieties rendering');
  const varieties = [
    { name: 'Alphonso', description: 'Sweet and juicy, the king of mangoes from Maharashtra.', price: 5.99, image: '🍋' },
    { name: 'Kesar', description: 'Rich, saffron-hued pulp from Gujarat, known for its aroma.', price: 4.99, image: '🍋' },
    { name: 'Dasheri', description: 'Fiberless and sweet, a popular variety from Uttar Pradesh.', price: 3.99, image: '🍋' },
    { name: 'Banganapalli', description: 'Large and tangy, a favorite from Andhra Pradesh.', price: 4.49, image: '🍋' },
    { name: 'Mallika', description: 'A hybrid with a creamy texture, grown in South India.', price: 5.49, image: '🍋' },
  ];

  const [quantity, setQuantity] = useState(1);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Mango Varieties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {varieties.map((variety, index) => {
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2 text-center">{variety.image}</div> {/* Image placeholder */}
              <h2 className="text-lg md:text-xl font-semibold text-center mb-2">{variety.name}</h2>
              <p className="text-sm md:text-base text-gray-600 text-center mb-2">{variety.description}</p>
              <p className="text-md md:text-lg font-bold text-center mb-2">${variety.price.toFixed(2)}</p>
              <div className="flex justify-center items-center space-x-2 mb-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span className="text-sm md:text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MangoVarieties;
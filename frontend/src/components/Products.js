import React from 'react';

const Products = () => {
  const products = [
    { name: 'Organic Tomatoes', price: '$4.99/lb', image: 'https://via.placeholder.com/150?text=Tomatoes' },
    { name: 'Fresh Spinach', price: '$3.99/bunch', image: 'https://via.placeholder.com/150?text=Spinach' },
    { name: 'Organic Carrots', price: '$2.99/lb', image: 'https://via.placeholder.com/150?text=Carrots' },
    { name: 'Bell Peppers', price: '$5.99/lb', image: 'https://via.placeholder.com/150?text=Peppers' },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Individual Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.price}</p>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 flex items-center justify-center">
              <span>🛒</span> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
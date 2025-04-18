import React from 'react';

const Products = () => {
  const products = [
    { name: 'Organic Tomatoes', price: '$4.99/lb', image: 'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg?w=600&q=60' },
    { name: 'Fresh Spinach', price: '$3.99/bunch', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'Organic Carrots', price: '$2.99/lb', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'Bell Peppers', price: '$5.99/lb', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Individual Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 relative">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition lg:after:content-[''] lg:after:absolute lg:after:right-[-12px] lg:after:top-0 lg:after:h-full lg:after:border-l-2 lg:after:border-gray-200"
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.price}</p>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 flex items-center justify-center w-full">
              <span>🛒</span> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
import React, { useContext } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { CartContext } from './CartContext';

const Products = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 4.99,
      image: 'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg?w=600&q=60',
    },
    {
      id: 2,
      name: 'Fresh Spinach',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Organic Carrots',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      name: 'Bell Peppers',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Individual Products</h2>
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 px-4 max-w-6xl mx-auto scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:snap-none lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-lg shadow flex-shrink-0 w-[40%] md:w-auto snap-center md:p-4"
          >
            <img src={product.image} alt={product.name} className="w-full h-32 md:h-48 object-cover rounded" />
            <h3 className="text-sm md:text-lg font-semibold mt-2 text-center">{product.name}</h3>
            <p className="text-gray-600 mt-1 text-center">${product.price.toFixed(2)}/lb</p>
            <div className="flex justify-center">
              <div className="md:hidden">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 flex items-center justify-center mt-2 w-8 h-8"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="hidden md:block">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 flex items-center justify-center w-full"
                >
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
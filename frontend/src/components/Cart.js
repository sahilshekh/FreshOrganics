import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartContext } from './CartContext';
import Footer from './Footer';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Handle quantity increase
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrease
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Cart</h1>
          <p className="text-base md:text-lg">Review your fresh organic selections.</p>
        </div>
      </section>

      {/* Cart Items Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Add some fresh produce to get started!</p>
              <Link
                to="/subscriptions"
                className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
              >
                Explore Subscriptions
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} / unit</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Minus className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <p className="text-lg font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-4 md:mt-0 md:ml-6 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}

              {/* Total and Checkout */}
              <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Total: ${totalPrice}</h2>
                <Link
                  to="/checkout"
                  className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
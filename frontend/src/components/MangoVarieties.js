import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaCheckCircle, FaLeaf, FaHeart, FaGlobe, FaShoppingBasket, FaUsers } from 'react-icons/fa'; // Import icons
import mobileMangoImage from './images/mobileMango.jpeg'; // Import mobile image
import desktopMangoBannerImage from './images/desktopMango.jpeg'; // Import desktop image
import alphonsoImage from './images/alpanso.webp'; // Import Alphonso image
import kesarImage from './images/kesar.jpg'; // Import Kesar image
import pairiImage from './images/pairi.jpg'; // Import Pairi image

const MangoVarieties = () => {
  console.log('MangoVarieties rendering');
  const { addToCart, updateQuantity, removeFromCart } = useContext(CartContext);

  const varieties = [
    { name: 'Alphonso(Hapus)', description: 'Renowned for its rich aroma, vibrant saffron hue, and buttery sweetness.', price: 799, originalPrice: 1200, isBestSeller: true, image: alphonsoImage },
    { name: 'Devgad Alphonso', description: 'Premium variety with thicker pulp and intense sweetness, often export quality.', price: 899, originalPrice: 3500, isBestSeller: false, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mhljZJr72WypkJoGFAQtd-2swYg_7JdxalENCR-QXQDVZsZQjddU9lQ8Hhsd3j4hv0I&usqp=CAU' },
    { name: 'Ratnagiri Alphonso', description: 'Celebrated for its delicate skin, fragrant aroma, and balanced sweetness.', price: 599, originalPrice: 3500, isBestSeller: false, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQigQ7tqv15Ch972iKoYJlQk1OPG6baoMvqkQ&s' },
    { name: 'Kesar', description: 'Known as the ‘Queen of Mangoes’ for its bright orange pulp and honeyed flavor.', price: 399, originalPrice: 3200, isBestSeller: false, image: kesarImage },
    { name: 'Pairi (Raspuri)', description: 'Juicy and tangy, ideal for juices and desserts, popular in South India.', price: 349, originalPrice: 600, isBestSeller: false, image: pairiImage },
  ];

  const benefits = [
    { icon: <FaCheckCircle className="text-orange-500 text-3xl" />, title: '100% Organic & Naturally Grown', description: 'We grow our mangoes without any chemicals or harmful pesticides — just sunlight, clean water, and care.' },
    { icon: <FaLeaf className="text-orange-500 text-3xl" />, title: 'Pesticide-Free Promise', description: 'Our farms are strictly pesticide-free, ensuring the mangoes you eat are as safe and healthy as they are flavorful.' },
    { icon: <FaHeart className="text-orange-500 text-3xl" />, title: '10% for a Cause', description: 'Every purchase helps. We donate 10% of our profits to support rural farming families and sustainable agriculture programs.' },
    { icon: <FaGlobe className="text-orange-500 text-3xl" />, title: 'Eco-Friendly Farming', description: 'Our methods help preserve biodiversity, reduce water waste, and enrich the soil — better mangoes, better planet.' },
    { icon: <FaShoppingBasket className="text-orange-500 text-3xl" />, title: 'Farm-to-Table Freshness', description: 'We pick and pack fresh — no cold storage, no long delays. Straight from our farms to your home.' },
    { icon: <FaUsers className="text-orange-500 text-3xl" />, title: 'Support Local Farmers', description: 'By choosing us, you’re empowering small-scale Indian farmers and promoting ethical sourcing.' },
  ];

  const [quantities, setQuantities] = useState(
    varieties.reduce((acc, variety) => {
      acc[variety.name] = 1; // Default quantity for each variety
      return acc;
    }, {})
  );

  const [cartStatus, setCartStatus] = useState(
    varieties.reduce((acc, variety) => {
      acc[variety.name] = false; // Tracks if the product is in cart
      return acc;
    }, {})
  );

  const handleAddToCart = (variety) => {
    const quantity = quantities[variety.name];
    const product = {
      ...variety,
      quantity,
      id: `mango-${variety.name.toLowerCase().replace(/\s/g, '-')}`,
    };
    addToCart(product);
    setCartStatus({ ...cartStatus, [variety.name]: true }); // Mark as added to cart
  };

  const handleQuantityChange = (variety, newQuantity) => {
    if (newQuantity === 0) {
      setCartStatus({ ...cartStatus, [variety.name]: false }); // Remove from cart UI
      setQuantities({ ...quantities, [variety.name]: 1 }); // Reset quantity to 1
      removeFromCart(variety.id); // Remove from cart
    } else {
      setQuantities({ ...quantities, [variety.name]: newQuantity });
      updateQuantity(variety.id, newQuantity); // Update quantity in CartContext
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Full-width banner section for desktop only */}
      <div className="w-full mb-8 hidden md:block">
        <img
          src={desktopMangoBannerImage}
          alt="Desktop Mango Banner"
          className="w-full h-auto rounded-lg shadow-md max-w-full"
        />
      </div>

      {/* Main content with constrained container */}
      <div className="container mx-auto p-4 md:p-6">
        {/* Mobile banner inside container */}
        <div className="w-full mb-8 md:hidden">
          <img
            src={mobileMangoImage}
            alt="Mobile Mango Banner"
            className="w-full h-auto block rounded-lg shadow-md"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-yellow-500">
          Discover Our Premium 100% Organic Mango Varieties
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {varieties.map((variety, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {variety.isBestSeller && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Best Seller
                </div>
              )}
              {variety.name === 'Kesar' && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Our Recommended
                </div>
              )}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                <img src={variety.image} alt={variety.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-gray-800">
                {variety.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 text-center mb-4">
                {variety.description}
              </p>
              <div className="text-center mb-4">
                <span className="text-lg font-semibold text-orange-500">
                  ₹{variety.price.toFixed(2)} / Dzn
                </span>
                <span className="ml-2 text-gray-400 line-through">
                  ₹{variety.originalPrice.toFixed(2)} / Dzn
                </span>
              </div>
              {cartStatus[variety.name] ? (
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        variety,
                        Math.max(0, quantities[variety.name] - 1)
                      )
                    }
                    className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-800 font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800">
                    {quantities[variety.name]}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        variety,
                        quantities[variety.name] + 1
                      )
                    }
                    className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-800 font-bold"
                  >
                    +
                  </button>
                  <Link
                    to="/cart"
                    className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(variety)}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Benefits Section */}
        <div className="mt-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 relative">
            Why Choose Our Mangoes?
            <span className="block w-24 h-1 bg-orange-500 rounded-full mx-auto mt-2"></span>
          </h2>
          <p className="text-center text-gray-700 mb-8 text-lg font-medium max-w-2xl mx-auto">
            Our mangoes aren’t just delicious — they’re part of something bigger. Here’s why they’re the right choice for your plate and the planet:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-start space-x-4"
              >
                <div className="flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangoVarieties;
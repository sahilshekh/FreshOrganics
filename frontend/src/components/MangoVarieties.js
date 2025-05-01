import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from './CartContext';
import mobileMangoImage from './images/mobileMango.jpeg'; // Import mobile image
import desktopMangoImage from './images/desktopMango.jpeg'; // Import desktop image

const MangoVarieties = () => {
  console.log('MangoVarieties rendering');
  const { addToCart } = useContext(CartContext);

  const varieties = [
    { name: 'Alphonso', description: 'Sweet and juicy, the king of mangoes from Maharashtra.', price: 100, image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/plant-sapling/e/t/c/annual-no-yes-kesar-mango-plant-1-plastic-bag-alphonso-original-imagj9nfgcpfd6r7.jpeg?q=70&crop=false' },
    { name: 'Kesar', description: 'Rich, saffron-hued pulp from Gujarat, known for its aroma.', price: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mhljZJr72WypkJoGFAQtd-2swYg_7JdxalENCR-QXQDVZsZQjddU9lQ8Hhsd3j4hv0I&usqp=CAU' },
    { name: 'Dasheri', description: 'Fiberless and sweet, a popular variety from Uttar Pradesh.', price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQigQ7tqv15Ch972iKoYJlQk1OPG6baoMvqkQ&s' },
    { name: 'Banganapalli', description: 'Large and tangy, a favorite from Andhra Pradesh.', price: 170, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnx7NF6sMSW6OPrvfTEm0aw9Vl7cNO2n4JfA&s' },
    { name: 'Mallika', description: 'A hybrid with a creamy texture, grown in South India.', price: 160, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5yyGitbfFr8ECJyCj2__Z9phYkdxUq8eW-w&s' },
  ];

  const [quantities, setQuantities] = useState(
    varieties.reduce((acc, variety) => {
      acc[variety.name] = 1;
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
    // toast.success(`${quantity} ${variety.name} added to cart!`, {
    //   icon: '🛒',
    //   style: {
    //     background: '#34D399',
    //     color: '#fff',
    //   },
    // });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-orange-600">
        Discover Our Premium 100% Organic Mango Varieties
      </h1>
      {/* Image Section */}
      <div className="w-full mb-8">
        <img
          src={mobileMangoImage}
          alt="Mobile Mango Banner"
          className="w-full h-auto md:hidden block rounded-lg shadow-md"
        />
        <img
          src={desktopMangoImage}
          alt="Desktop Mango Banner"
          className="w-full h-auto hidden md:block rounded-lg shadow-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {varieties.map((variety, index) => (
          <div
            key={index}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
              <img src={variety.image} alt={variety.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-gray-800">
              {variety.name}
            </h2>
            <p className="text-sm md:text-base text-gray-600 text-center mb-4">
              {variety.description}
            </p>
            <p className="text-lg font-semibold text-center mb-4 text-orange-500">
              ₹{variety.price.toFixed(2)} / kg
            </p>
            <div className="flex justify-center items-center space-x-3 mb-4">
              <button
                onClick={() =>
                  setQuantities({
                    ...quantities,
                    [variety.name]: Math.max(1, quantities[variety.name] - 1),
                  })
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
                  setQuantities({
                    ...quantities,
                    [variety.name]: quantities[variety.name] + 1,
                  })
                }
                className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-200 text-gray-800 font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleAddToCart(variety)}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangoVarieties;
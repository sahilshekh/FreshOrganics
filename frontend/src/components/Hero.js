import React from 'react';
import heroBackground from './images/main.png'; 

const Hero = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
  
      <div className="absolute inset-0 bg-black opacity-50"></div>
      

      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div> 
          <h2 className="text-5xl font-bold leading-tight">Farm Fresh Organic Vegetables</h2>
          <h3 className="text-5xl font-bold mb-4">Delivered to Your Door</h3>
          <p className="text-xl mb-8">Experience the freshness of organic vegetables sourced directly from local farmers</p>
          <div className="mt-6 space-x-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">Start Subscription</button>
            <button className="bg-white text-green-500 px-6 py-2 rounded-full hover:bg-gray-200">Shop Individual Items</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
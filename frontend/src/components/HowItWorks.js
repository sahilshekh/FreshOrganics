import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-green-50 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="flex justify-around text-center">
        <div className="max-w-xs">
          <div className="flex justify-center mb-4">
            <span className="bg-white rounded-full p-4">👨‍🌾</span>
          </div>
          <h3 className="text-xl font-semibold">Partner with Farmers</h3>
          <p className="mt-2">We work directly with certified organic farmers to ensure the highest quality produce</p>
        </div>
        <div className="max-w-xs">
          <div className="flex justify-center mb-4">
            <span className="bg-white rounded-full p-4">📅</span>
          </div>
          <h3 className="text-xl font-semibold">Choose Your Plan</h3>
          <p className="mt-2">Select from weekly or monthly subscription plans, or order individual items</p>
        </div>
        <div className="max-w-xs">
          <div className="flex justify-center mb-4">
            <span className="bg-white rounded-full p-4">🚚</span>
          </div>
          <h3 className="text-xl font-semibold">Fresh Harvest</h3>
          <p className="mt-2">Vegetables are harvested fresh on the day of delivery</p>
        </div>
        <div className="max-w-xs">
          <div className="flex justify-center mb-4">
            <span className="bg-white rounded-full p-4">🏠</span>
          </div>
          <h3 className="text-xl font-semibold">Home Delivery</h3>
          <p className="mt-2">Get your fresh organic vegetables delivered right to your doorstep</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
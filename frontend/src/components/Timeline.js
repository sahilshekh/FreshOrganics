import React from 'react';
import { Users, Calendar, Package, Home } from 'lucide-react'; // Import relevant Lucide icons

const Timeline = () => {
  const phases = [
    {
      title: 'Partner with Farmers',
      months: 'JAN - MAR',
      icon: <Users className="h-12 w-12 text-green-500" />,
      description: ['We work directly with certified organic farmers to ensure the highest quality produce'],
    },
    {
      title: 'Choose Your Plan',
      months: 'APR - JUN',
      icon: <Calendar className="h-12 w-12 text-green-500" />,
      description: ['Select from weekly or monthly subscription plans, or order individual items'],
    },
    {
      title: 'Fresh Harvest',
      months: 'JUL - SEP',
      icon: <Package className="h-12 w-12 text-green-500" />,
      description: ['Vegetables are harvested fresh on the day of delivery'],
    },
    {
      title: 'Home Delivery',
      months: 'OCT - DEC',
      icon: <Home className="h-12 w-12 text-green-500" />,
      description: ['Get your fresh organic vegetables delivered right to your doorstep'],
    },
  ];

  return (
    <div className="py-12 bg-green-50">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-1 bg-green-500 w-11/12"></div>
        
        {/* Phases */}
        <div className="flex justify-between items-center relative">
          {phases.map((phase, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="relative">
                {/* Icon Circle */}
                <div className="flex justify-center mb-4">
                  <div className="bg-white rounded-full mt-4 p-4 shadow-md">
                    {phase.icon}
                  </div>
                </div>
                {/* Phase Title and Months */}
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{phase.months}</p>
                {/* Description */}
                <ul className="text-sm text-gray-700">
                  {phase.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Vertical Line Connector (except last phase) */}
              {index < phases.length - 1 && (
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-green-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
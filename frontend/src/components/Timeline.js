import React from 'react';
import { Users, Calendar, Package, Home, ArrowRight, ArrowDown } from 'lucide-react';

const Timeline = () => {
  const phases = [
    {
      title: 'We Partner With Farmers',
      months: 'JAN - MAR',
      icon: <Users className="h-12 w-12 text-green-500" />,
      description: ['We work hand-in-hand with trusted farmers to bring you the freshest, highest-quality produce straight from their fields to your table.'],
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
        {/* Desktop view with horizontal line */}
        <div className="hidden sm:block relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-1 bg-green-500 w-11/12 top-12" />
          
          <div className="flex flex-row justify-between items-start">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center w-full">
                <div className="text-center flex-1 px-2 relative z-10 min-h-[200px]">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white rounded-full p-4 shadow-md">
                      {phase.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                  <ul className="text-sm text-gray-700">
                    {phase.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                {index < phases.length - 1 && (
                  <div className="flex items-center h-full">
                    <ArrowRight className="h-6 w-6 text-green-500 mx-2 flex-shrink-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile view */}
        <div className="sm:hidden space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-4 shadow-md mr-4 flex-shrink-0">
                  {phase.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{phase.title}</h3>
                  <ul className="text-sm text-gray-700">
                    {phase.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < phases.length - 1 && (
                <div className="flex justify-center mt-4">
                  <ArrowDown className="h-6 w-6 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
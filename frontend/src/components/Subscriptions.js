import React from 'react';
import { Check } from 'lucide-react';

const Subscriptions = () => {
  const plans = [
    {
      name: 'Weekly Basic Subscription Plan',
      price: '₹999/week',
      features: [
        '9-10 types of seasonal vegetables',
        'Bulk quantities for family',
        'Free delivery',
        'Expert nutritionist recipe suggestions',
        'Daily call confirmation before each order',
        'Save money on essential groceries',
        'Enjoy a variety of seasonal vegetables',
        'Convenient and hassle-free subscription service',
      ],
    },
    {
      name: 'Monthly Basic Subscription Plan',
      price: '₹3599/month',
      features: [
        '9-10 types of seasonal vegetables',
        'Bulk quantities for family',
        'Free delivery',
        'Expert nutritionist recipe suggestions',
        'Daily call confirmation before each order',
        'Save money on essential groceries',
        'Enjoy a variety of seasonal vegetables',
        'Convenient and hassle-free subscription service',
      ],
    },
    {
      name: 'Weekly Premium Subscription Plan',
      price: '₹1699/week',
      features: [
        '9-10 types of seasonal vegetables',
        '2-3 types of freshly produced fruits',
        '1 type of seasonal dried vegetable',
        'Free delivery',
        'Expert nutritionist recipe suggestions/pause anytime',
        'Priority customer support',
        'Save money on essential groceries',
        'Enjoy a variety of seasonal vegetables',
        'Convenient and hassle-free subscription service',
        'Expert nutritionist-backed recipe suggestions',
        'Monthly seasonal specials',
      ],
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Subscription Plans</h2>
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-6 px-4 max-w-6xl mx-auto scrollbar-hide items-start md:grid md:grid-cols-2 md:overflow-visible md:snap-none lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-transform duration-300 md:hover:-translate-y-2 flex-shrink-0 w-[80%] snap-center md:w-auto ${
              index === 1 ? 'border-2 border-green-500' : ''
            }`}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold mt-2">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" /> {feature}
                </li>
              ))}
            </ul>
            <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600 w-full transition-colors duration-300">
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;

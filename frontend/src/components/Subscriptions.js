import React from 'react';

const Subscriptions = () => {
  const plans = [
    {
      name: 'Weekly Essential',
      price: '$29.99/week',
      features: ['5-7 types of seasonal vegetables', 'Free delivery', 'Weekly delivery schedule', 'Skip or pause anytime', 'Recipe suggestions'],
    },
    {
      name: 'Weekly Premium',
      price: '$49.99/week',
      features: ['8-10 types of seasonal vegetables', 'Premium organic varieties', 'Free delivery', 'Weekly delivery schedule', 'Skip or pause anytime', 'Recipe suggestions', 'Priority customer support'],
    },
    {
      name: 'Monthly Family',
      price: '$179.99/month',
      features: ['10-12 types of seasonal vegetables', 'Bulk quantities for family', 'Free delivery', 'Flexible delivery schedule', 'Skip or pause anytime', 'Recipe suggestions', 'Priority customer support', 'Monthly seasonal specials'],
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold mt-2">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600 w-full">Subscribe Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
import React from 'react';
import { Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Subscriptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const showFooter = location.pathname === '/subscriptions';

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
        { text: 'Priority customer support', crossed: true },
        { text: 'Expert nutritionist-backed recipe suggestions', crossed: true },
        { text: 'Monthly seasonal specials', crossed: true },
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
        { text: 'Priority customer support', crossed: true },
        { text: 'Expert nutritionist-backed recipe suggestions', crossed: true },
        { text: 'Monthly seasonal specials', crossed: true },
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

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please log in to subscribe.');
      navigate('/'); // Redirect to home where login popup will appear
      return;
    }
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { subscription: plan.name, subscriptionPrice: plan.price }, { merge: true });
      toast.success(`Subscribed to ${plan.name}!`);
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <>
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
                    {typeof feature === 'string' ? (
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                    ) : feature.crossed ? (
                      <span className="text-red-500 mr-2">❌</span>
                    ) : null}
                    {typeof feature === 'string' ? feature : feature.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600 w-full transition-colors duration-300"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* {showFooter && <Footer />} */}
    </>
  );
};

export default Subscriptions;
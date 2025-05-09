import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 text-center py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your purchase. You'll receive a confirmation soon.
      </p>
      <Link
        to="/subscriptions"
        className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
      >
        Continue Shopping
        <ArrowRight className="h-5 w-5 ml-2" />
      </Link>
    </div>
  );
};

export default OrderConfirmation;
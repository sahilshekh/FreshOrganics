import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from './CartContext';
import Hero from './Hero';
import Timeline from './Timeline';
import Subscriptions from './Subscriptions';
import Products from './Products';
import Footer from './Footer';
import TryForTodayPopup from './TryForTodayPopup';
import LoginSignupPopup from './LoginSignupPopup';

function Home() {
  const { addBundleToCart } = useContext(CartContext); // Updated to use the new CartContext
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  // Add bundle to cart and show toast
  const handleAddBundleToCart = (products) => {
    addBundleToCart(products); // This now saves to Firestore via CartContext
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Hero
        onTryForToday={() => setIsPopupOpen(true)}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
      />
      <Timeline />
      <Subscriptions />
      <Products />
      {/* <Footer /> */}
      <TryForTodayPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddBundleToCart={handleAddBundleToCart}
      />
      <LoginSignupPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
      />
    </div>
  );
}

export default Home;
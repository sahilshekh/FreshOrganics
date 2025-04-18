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
  const { setCartItems } = useContext(CartContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  // Add bundle to cart and show toast
  const handleAddBundleToCart = (products) => {
    setCartItems((prevItems) => {
      let updatedItems = [...prevItems];
      products.forEach((product) => {
        const existingItem = updatedItems.find((item) => item.id === product.id);
        if (existingItem) {
          updatedItems = updatedItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedItems.push({ ...product, quantity: 1 });
        }
      });
      return updatedItems;
    });
    toast.success('Bundle added to cart!', {
      icon: '🛒',
    });
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
      <Footer />
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
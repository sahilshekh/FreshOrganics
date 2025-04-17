import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Hero from './Hero';
import Timeline from './Timeline';
import Subscriptions from './Subscriptions';
import Products from './Products';
import Footer from './Footer';
import TryForTodayPopup from './TryForTodayPopup';

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Hero onTryForToday={() => setIsPopupOpen(true)} />
      <Timeline />
      <Subscriptions />
      <Products />
      <Footer />
      <TryForTodayPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default Home;
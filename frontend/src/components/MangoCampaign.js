import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MangoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 6,
    minutes: 45,
    seconds: 41,
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Starting timer effect');
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }
        if (days < 0) {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log('Clearing sessionStorage on mount');
    sessionStorage.removeItem('mangoBannerClosed');
  }, []);

  const handleClose = () => {
    console.log('Closing banner');
    setIsVisible(false);
    sessionStorage.setItem('mangoBannerClosed', 'true');
    window.dispatchEvent(new Event('bannerClosed')); // Dispatch custom event
  };

  const handleBuyNow = () => {
    console.log('Navigating to /mango-varieties');
    navigate('/mango-varieties');
  };

  if (!isVisible || sessionStorage.getItem('mangoBannerClosed')) {
    console.log('Banner hidden due to visibility or sessionStorage');
    return null;
  }

  return (
    <div className="relative bg-orange-500 text-white p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between w-full shadow-md">
      {/* Left Section: Emoji and Text */}
      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
        <span className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">🍋</span>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight">
            Fresh Organic Mangoes Available Now
              
          </h3>
          <p className="text-sm sm:text-base text-gray-100">Malinco, Java, Gasnel</p>
        </div>
      </div>
      {/* Center Section: Timer (Hidden on Mobile) */}
      
      {/* Right Section: Text and Button */}
      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
        <span className="text-sm sm:text-base">Fresh Mangoes Included!</span>
        <button
          onClick={handleBuyNow}
          className="bg-yellow-400 text-black px-3 sm:px-4 md:px-5 py-1 sm:py-2 text-sm sm:text-base font-semibold hover:bg-yellow-500 transition-colors"
        >
          BUY NOW
        </button>
      </div>
      {/* Close Button (Absolute Positioned) */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-white hover:text-gray-300 sm  sm:top-1 sm:right-4"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default MangoBanner;
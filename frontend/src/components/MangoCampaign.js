import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MangoBanner = () => {
  console.log('MangoBanner rendering');
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
    <div className="bg-orange-500 text-white p-2 flex items-center justify-between md:flex-row flex-col">
      <div className="flex items-center space-x-2 md:space-x-4">
        <span className="text-2xl md:text-3xl">🍋</span>
        <div>
          <h3 className="text-sm md:text-base font-bold">Fresh Mangoes Available Now</h3>
          <p className="text-xs md:text-sm">Malinco, Java, Gasnel</p>
        </div>
      </div>
      <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
        <span>{String(timeLeft.days).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="hidden md:inline">DAYS HOURS MINS SECS</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs md:text-sm">Fresh Mangoes Included!</span>
        <button
          onClick={handleBuyNow}
          className="bg-yellow-400 text-black px-2 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm hover:bg-yellow-500"
        >
          BUY NOW
        </button>
      </div>
      <button onClick={handleClose} className="text-white hover:text-gray-300 ml-2">
        <X size={20} />
      </button>
    </div>
  );
};

export default MangoBanner;
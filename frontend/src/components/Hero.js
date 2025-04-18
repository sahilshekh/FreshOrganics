import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { AuthContext } from './AuthContext';
import heroBackground from './images/main.png';

const Hero = ({ onTryForToday, setIsLoginPopupOpen }) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Farm Fresh Organic Vegetables</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Delivered to Your Door</h3>
          <p className="text-lg sm:text-xl md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Experience the freshness of organic vegetables sourced directly from local farmers
          </p>
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={() => (user ? null : setIsLoginPopupOpen(true))}
              className="bg-green-500 text-white px-6 py-[0.7rem] rounded-full hover:bg-green-600 w-3/4 sm:w-auto mx-auto sm:mx-0"
            >
              {user ? (
                <Link to="/subscriptions">Start Subscription</Link>
              ) : (
                'Start Subscription'
              )}
            </button>
            <button className="bg-white text-green-500 px-6 py-[0.7rem] rounded-full hover:bg-gray-200 w-3/4 sm:w-auto mx-auto sm:mx-0">
              Shop Individual Items
            </button>
            <button
              onClick={onTryForToday}
              className="bg-green-500 text-white px-6 py-[0.7rem] rounded-full hover:bg-green-600 w-3/4 sm:w-auto mx-auto sm:mx-0 flex items-center justify-center"
            >
              Try for Today
              <Star className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
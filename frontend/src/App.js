import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { AuthProvider, AuthContext } from './components/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import About from './components/About';
import Profile from './components/Profile';
import Subscriptions from './components/Subscriptions';
import LoginSignupPopup from './components/LoginSignupPopup';
import MangoVarieties from './components/MangoVarieties';
import MangoBanner from './components/MangoCampaign';
import { auth } from './firebase'; // Import Firebase auth

// Privacy Policy Component
const PrivacyPolicy = () => (
  <div className="container mx-auto p-4 sm:p-6 bg-white min-h-screen">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-green-700">Privacy Policy</h1>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      <strong>Last updated:</strong> April 29, 2025
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      FreshOrganics ("us", "we", or "our") operates https://www.freshorganics.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site.
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Information Collection and Use</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email, and contact number ("Personal Information").
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      We collect information from you when you register on our site, place an order, or fill out a form. When filling out a form on our site, for any of the above-mentioned reasons, you may be asked to enter your: name, e-mail address, and phone number. You may, however, visit our site anonymously. Any of the information we collect from you is used to personalize your experience, improve our website, process transactions, and enhance customer service. Any data collected will not be shared with any third party.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Log Data</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      In addition, we may use third-party services such as Google Analytics that collect, monitor, and analyze page visits in anonymous ways.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Communications</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      We may use your Personal Information to contact you with newsletters, marketing or promotional materials, and other information for the sole purpose of business transactions, such as order confirmations and updates.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Cookies</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your computer's hard drive.
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Security</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Changes to This Privacy Policy</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      This Privacy Policy is effective as of April 29, 2025, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the Site after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us or by placing a prominent notice on our website.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Contact Us</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      If you have any questions about this Privacy Policy, please contact us at{' '}
      <a href="mailto:support@freshorganics.com" className="text-green-600 hover:underline">
        support@OnlyFarms.com
      </a>.
    </p>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log('ProtectedRoute user:', user);
  return user ? children : <Navigate to="/" />;
};

// Protected Link Component
const ProtectedLink = ({ to, children, onClick, ...props }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    console.log('ProtectedLink clicked:', { to, user: !!user, isMenuOpen });
    if (user || (to !== '/cart' && to !== '/profile')) {
      console.log('Calling Header onClick to hide menu');
      if (onClick) onClick(e);
      setIsMenuOpen(false);
    } else {
      console.log('Skipping Header onClick to keep menu open for unauthenticated /cart or /profile');
    }
    if (!user && (to === '/cart' || to === '/profile')) {
      console.log('Opening LoginSignupPopup for:', to);
      setIsLoginPopupOpen(true);
    } else {
      console.log('Navigating to:', to);
      navigate(to);
    }
  };

  const handleMenuClose = () => {
    console.log('Closing hamburger menu after login/signup');
    setIsMenuOpen(false);
    if (onClick) onClick();
  };

  return (
    <>
      <button onClick={handleClick} {...props}>
        {children}
      </button>
      <LoginSignupPopup
        key={`popup-${to}-${isLoginPopupOpen}`}
        isOpen={isLoginPopupOpen}
        onClose={() => {
          console.log('Closing LoginSignupPopup');
          setIsLoginPopupOpen(false);
          if (user && (to === '/cart' || to === '/profile')) {
            console.log('Navigating after login to:', to);
            navigate(to);
          }
        }}
        onMenuClose={handleMenuClose}
      />
    </>
  );
};

// App Content Component
const AppContent = () => {
  const { user } = useContext(AuthContext);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const location = useLocation(); // Use useLocation to get the current pathname
  const hideFooterOnAbout = location.pathname === '/about'; // Hide footer on /about

  useEffect(() => {
    if (!user && !sessionStorage.getItem('loginPopupShown')) {
      console.log('Setting 30-second timer for popup');
      const timer = setTimeout(() => {
        console.log('Opening LoginSignupPopup after 30 seconds');
        setIsLoginPopupOpen(true);
        sessionStorage.setItem('loginPopupShown', 'true');
      }, 30000);
      return () => {
        console.log('Clearing 30-second timer');
        clearTimeout(timer);
      };
    }
  }, [user]);

  return (
    <>
      <MangoBanner />
      <Header ProtectedLink={ProtectedLink} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/mango-varieties" element={<MangoVarieties />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <LoginSignupPopup
        isOpen={isLoginPopupOpen}
        onClose={() => {
          console.log('Closing global LoginSignupPopup');
          setIsLoginPopupOpen(false);
          sessionStorage.setItem('loginPopupShown', 'true');
        }}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#cfc23a',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '12px',
            fontFamily: 'sans-serif',
          },
          success: {
            duration: 3000,
          },
        }}
      />
      {!hideFooterOnAbout && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
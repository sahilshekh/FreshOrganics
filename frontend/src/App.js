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
    {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-green-700">Privacy Policy</h1> */}
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      <strong>Last updated:</strong> May 01, 2025
    </p>

    {/* <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Pricing Policy</h2> */}
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      At onlyfams, we strive to provide transparent and fair pricing for all our products. Prices are listed in Indian Rupees (₹) and include applicable taxes unless otherwise stated. Prices are subject to change due to market conditions, seasonality, or supplier costs. We notify customers of any price changes through our website or email. Discounts or promotional offers are valid only during the specified period and cannot be combined unless stated.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Shipping Policy</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      We offer shipping across India for all orders placed on https://www.onlyfams.in/. Shipping charges are calculated at checkout based on your location and order weight. Standard delivery takes 3-7 business days, while express shipping (if available) takes 1-3 business days. Orders are processed within 24 hours, and tracking information will be provided via email. We are not responsible for delays due to unforeseen circumstances like weather or customs.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Terms and Conditions</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      By using the onlyfams website, you agree to comply with these terms. All purchases are subject to availability, and we reserve the right to refuse or cancel orders at our discretion. Payment must be made in full at the time of order placement. You are responsible for providing accurate delivery information. Any misuse of the site, including unauthorized access or fraudulent activity, will result in account termination and legal action.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Privacy Policy</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      onlyfams ("us", "we", or "our") operates https://www.onlyfams.in/ (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.
    </p>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      While using our Site, we may ask you to provide personally identifiable information such as your name, email, and contact number. This information is used to personalize your experience, process transactions, and enhance customer service. We do not share your data with third parties.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Cancellation/Refund Policy</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      You may cancel your order within 24 hours of placement by contacting us at support@onlyfams.com. Refunds are processed within 7-10 business days after cancellation approval, provided the product has not been shipped. If a product is damaged or defective upon delivery, please report it within 48 hours with photos for a full refund or replacement. Shipping costs are non-refundable unless the error is on our part.
    </p>

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-600">Contact Us</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-4">
      If you have any questions about these policies, please contact us at{' '}
      <a href="mailto:support@onlyfams.com" className="text-green-600 hover:underline">
        support@onlyfams.com
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
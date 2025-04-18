import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { AuthProvider, AuthContext } from './components/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import About from './components/About';
import Profile from './components/Profile';
import Subscriptions from './components/Subscriptions';
import LoginSignupPopup from './components/LoginSignupPopup';

// Placeholder components for new routes
const EditProfile = () => <div>Edit Profile Page</div>;
const OrderHistory = () => <div>Order History Page</div>;

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
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Track menu state locally

  const handleClick = (e) => {
    e.preventDefault();
    console.log('ProtectedLink clicked:', { to, user: !!user, isMenuOpen });
    // Only call onClick (to close menu) if user is authenticated or link is not /cart or /profile
    if (user || (to !== '/cart' && to !== '/profile')) {
      console.log('Calling Header onClick to hide menu');
      if (onClick) onClick(e);
      setIsMenuOpen(false);
    } else {
      console.log('Skipping Header onClick to keep menu open for unauthenticated /cart or /profile');
    }
    // Handle navigation or popup
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
    if (onClick) onClick(); // Trigger Header's handleLinkClick to close menu
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

  // Show login/signup popup after 30 seconds if not logged in, once per session
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
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/order-history" element={<OrderHistory />} />
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
            background: '#15803d', // bg-green-700
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
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

const LoginSignupPopup = ({ isOpen, onClose, onMenuClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted:', { isLogin, name, email, password });

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          toast.success('Logged in successfully!');
          setName('');
          setEmail('');
          setPassword('');
          if (onMenuClose) onMenuClose(); // Close hamburger menu if onMenuClose is provided
          onClose();
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        const success = await signup(name, email, password);
        if (success) {
          toast.success('Signed up successfully!');
          setName('');
          setEmail('');
          setPassword('');
          if (onMenuClose) onMenuClose(); // Close hamburger menu if onMenuClose is provided
          onClose();
        } else {
          toast.error('Email already exists or signup failed');
        }
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    console.log('Name input:', e.target.value);
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log('Email input:', e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log('Password input:', e.target.value);
    setPassword(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 login-popup"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          {isLogin ? 'Please Login' : 'Create an Account'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
                required
                disabled={isLoading}
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-700 text-white p-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-700 hover:underline font-medium"
            disabled={isLoading}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPopup;
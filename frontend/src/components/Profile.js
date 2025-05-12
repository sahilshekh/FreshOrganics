import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, LogOut, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';
import Footer from './Footer';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out user:', user?.email);
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  // Fallback if user is null (shouldn't happen due to ProtectedRoute)
  if (!user) {
    console.log('No user found in Profile');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-base md:text-lg">Manage your account and preferences.</p>
        </div>
      </section>

      {/* Profile Details Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
                <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
              </div>
              <div>
                <p className="text-gray-600"><strong>Address:</strong> {user.address}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                to="/edit-profile"
                className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
              >
                Edit Profile
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Account Actions Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Account Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              to="/order-history"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-100 transition-colors duration-300"
            >
              <Package className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order History</h3>
              <p className="text-gray-600 text-sm">View your past orders and track deliveries.</p>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-100 transition-colors duration-300"
            >
              <LogOut className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Log Out</h3>
              <p className="text-gray-600 text-sm">Sign out of your account.</p>
            </button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Profile;
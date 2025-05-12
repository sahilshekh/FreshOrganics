import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

const EditProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize form state with current user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: user?.address || '',
    phone: user?.phone || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate phone number
      if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
        toast.error('Phone number must be 10 digits.');
        setLoading(false);
        return;
      }

      // Update profile in Firestore via AuthContext
      await updateProfile({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
      });

      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Edit Profile</h1>
          <p className="text-base md:text-lg">Update your personal information.</p>
        </div>
      </section>

      {/* Edit Form Section */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  rows="3"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  pattern="\d{10}"
                  placeholder="9999999999"
                />
              </div>
              <div className="flex justify-between">
                <Link
                  to="/profile"
                  className="inline-flex items-center text-green-700 hover:text-green-600 font-medium"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Profile
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-white font-medium ${
                    loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
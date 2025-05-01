import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ArrowRight, CheckCircle } from 'lucide-react';
import Footer from './Footer';
import { CartContext } from './CartContext';
import { db } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
    if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'CVV is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (!user) {
        alert('Please log in to place an order.');
        return;
      }
      try {
        // Save order to Firestore
        const orderRef = collection(db, 'orders');
        await addDoc(orderRef, {
          userId: user.uid,
          items: cartItems,
          total: parseFloat(totalPrice),
          shipping: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            phone: formData.phone,
          },
          createdAt: new Date(),
          status: 'pending',
        });

        // Clear the cart in Firestore
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: [] }, { merge: true });
        setCartItems([]);

        alert('Order placed successfully!');
        navigate('/order-confirmation');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-base md:text-lg">Complete your order for fresh organic goodness!</p>
        </div>
      </section>

      {/* Checkout Form and Order Summary */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                <Truck className="h-6 w-6 mr-2" /> Shipping & Payment
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                {/* Payment Details */}
                <h3 className="text-lg font-semibold text-green-700 mt-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" /> Payment Information
                </h3>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                    maxLength="16"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                      maxLength="5"
                    />
                    {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={`mt-1 block w-full p-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                      maxLength="4"
                    />
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
                  >
                    Place Order
                    <CheckCircle className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">
                    ₹{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                  ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/cart"
                  className="inline-flex items-center text-green-700 hover:text-green-600 font-medium"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer/> */}
    </div>
  );
};

export default Checkout;
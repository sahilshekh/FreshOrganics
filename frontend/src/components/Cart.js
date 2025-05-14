import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartContext } from './CartContext';
import { db } from '../firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp,getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(null);
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [addressError, setAddressError] = useState('');
  const navigate = useNavigate();

  console.log('Cart items:', cartItems);

  // Calculate subtotal
  const subtotal = cartItems
    .reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
    .toFixed(2);

  // Determine delivery fee: ₹150 if subtotal < ₹1000, free otherwise
  const deliveryFee = parseFloat(subtotal) < 1000 ? 150 : 0;

  // Calculate final total (subtotal + delivery fee)
  const finalTotal = (parseFloat(subtotal) + deliveryFee).toFixed(2);

  // Calculate amount needed for free delivery (if subtotal < ₹1000)
  const amountNeededForFreeDelivery =
    parseFloat(subtotal) < 1000 ? (1000 - parseFloat(subtotal)).toFixed(2) : 0;

  // Load user's saved address (if any) from Firestore
  useEffect(() => {
    const loadUserAddress = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAddress(userData.address || '');
          setPinCode(userData.pinCode || '');
          setAddressConfirmed(userData.address && userData.pinCode ? true : false);
        }
      } catch (error) {
        console.error('Error loading user address:', error);
      }
    };

    loadUserAddress();
  }, [user]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptError('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const saveCart = async (updatedItems) => {
    if (!user) return;
    try {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { userId: user.uid, items: updatedItems }, { merge: true });
    } catch (error) {
      console.error('Error saving cart:', error);
      toast.error('Failed to save cart');
    }
  };

  const saveOrder = async (orderData) => {
    try {
      const orderRef = collection(db, 'orders');
      const orderDoc = await addDoc(orderRef, {
        userId: user.uid,
        items: orderData.items,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total,
        address: orderData.address, // Save address
        pinCode: orderData.pinCode, // Save pin code
        createdAt: serverTimestamp(),
        status: 'completed',
      });
      return orderDoc.id;
    } catch (error) {
      console.error('Error saving order:', error);
      throw new Error('Failed to save order');
    }
  };

  const increaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
    );
    setCartItems(updatedItems);
    await saveCart(updatedItems);
  };

  const decreaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && (item.quantity || 0) > 1 ? { ...item, quantity: (item.quantity || 0) - 1 } : item
    );
    setCartItems(updatedItems);
    await saveCart(updatedItems);
  };

  const removeItem = async (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    await saveCart(updatedItems);
  };

  // Validate pin code for Mumbai and Palghar districts
  const validatePinCode = (pin) => {
    const pinNum = parseInt(pin, 10);
    // Mumbai: 400001 to 400104
    // Palghar: 401201 to 401606
    const isMumbai = pinNum >= 400001 && pinNum <= 400104;
    const isPalghar = pinNum >= 401201 && pinNum <= 401606;
    return isMumbai || isPalghar;
  };

  const handleConfirmAddress = async () => {
    if (!address.trim()) {
      setAddressError('Please enter a valid address.');
      return;
    }

    if (!pinCode.trim() || pinCode.length !== 6 || isNaN(pinCode)) {
      setAddressError('Please enter a valid 6-digit pin code.');
      return;
    }

    if (!validatePinCode(pinCode)) {
      setAddressError('We only deliver to Mumbai and Palghar districts. Please enter a valid pin code.');
      return;
    }

    setAddressError('');
    setAddressConfirmed(true);

    // Save address to Firestore user document
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { address, pinCode }, { merge: true });
        toast.success('Address confirmed successfully!');
      } catch (error) {
        console.error('Error saving address:', error);
        toast.error('Failed to save address.');
      }
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please log in to proceed with payment');
      return;
    }

    if (!addressConfirmed) {
      toast.error('Please confirm your delivery address before proceeding.');
      return;
    }

    if (!scriptLoaded) {
      toast.error('Razorpay script not loaded yet');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://us-central1-onlyfams-prod.cloudfunctions.net/createOrder',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(finalTotal),
            userId: user.uid,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log('createOrder error:', errorData);
        throw new Error(errorData.error || 'Failed to create order');
      }

      const { orderId, amount, currency } = await response.json();
      console.log('createOrder response:', { orderId, amount, currency });

      const options = {
        key: 'rzp_live_54RIreCvC4vdEr',
        amount,
        currency,
        name: 'Organic Store',
        description: 'Cart Payment',
        order_id: orderId,
        handler: async (response) => {
          console.log('Razorpay payment success:', response);
          const verifyResponse = await fetch(
            'https://us-central1-onlyfams-prod.cloudfunctions.net/verifyPayment',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            }
          );

          if (!verifyResponse.ok) {
            const errorData = await verifyResponse.json();
            console.log('verifyPayment error:', errorData);
            throw new Error(errorData.message || 'Failed to verify payment');
          }

          const verifyResult = await verifyResponse.json();
          if (verifyResult.isOk) {
            await setDoc(doc(db, 'transactions', response.razorpay_payment_id), {
              userId: user.uid,
              orderId,
              paymentId: response.razorpay_payment_id,
              amount: finalTotal,
              currency,
              cartItems,
              status: 'success',
              timestamp: new Date(),
            });

            const orderDocId = await saveOrder({
              items: cartItems,
              subtotal: parseFloat(subtotal),
              deliveryFee,
              total: parseFloat(finalTotal),
              address, // Include address in order
              pinCode, // Include pin code in order
            });

            await setDoc(doc(db, 'carts', user.uid), { userId: user.uid, items: [] });
            setCartItems([]);
            toast.success('Payment successful!');
            navigate(`/order-confirmation/${orderDocId}`);
          } else {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.name || '',
          email: user.email || '',
          contact: user.phone || '',
        },
        theme: { color: '#16a34a' },
      };

      console.log('Razorpay options:', options);
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', (response) => {
        console.log('Razorpay payment failed:', response);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      razorpayInstance.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Cart</h1>
          <p className="text-base md:text-lg">Review your fresh organic selections.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Add some fresh produce to get started!</p>
              <Link
                to="/subscriptions"
                className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
              >
                Explore Subscriptions
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">₹{(item.price || 0).toFixed(2)} / Dzn</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Minus className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-lg">{item.quantity || 0}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-4 md:mt-0 md:ml-6 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                {/* Free Delivery Note */}
                {amountNeededForFreeDelivery > 0 && (
                  <div className="text-center bg-green-100 text-green-800 p-3 rounded-lg">
                    <p>
                      Add ₹{amountNeededForFreeDelivery} more to get{' '}
                      <span className="font-semibold">free delivery</span>!
                    </p>
                    <Link
                      to="/mango-varieties"
                      className="inline-flex items-center text-green-700 hover:text-green-600 font-medium mt-2"
                    >
                      Shop More
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                )}
                {/* Breakdown of charges */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Subtotal:</h2>
                  <p className="text-lg text-gray-800">₹{subtotal}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Delivery Fee:
                    {deliveryFee === 0 && (
                      <span className="text-sm text-green-600 ml-2">(Free)</span>
                    )}
                  </h2>
                  <p className="text-lg text-gray-800">₹{deliveryFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <h2 className="text-xl font-bold text-gray-800">Total:</h2>
                  <p className="text-xl font-bold text-gray-800">₹{finalTotal}</p>
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Delivery Address</h2>
                <p className="text-gray-600">
                  Note: We only deliver to Mumbai and Palghar districts.
                </p>
                {addressConfirmed ? (
                  <div>
                    <p className="text-gray-800">
                      <strong>Address:</strong> {address}
                    </p>
                    <p className="text-gray-800">
                      <strong>Pin Code:</strong> {pinCode}
                    </p>
                    <button
                      onClick={() => setAddressConfirmed(false)}
                      className="text-green-700 hover:text-green-600 font-medium mt-2"
                    >
                      Change Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
                        Full Address
                      </label>
                      <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full address (e.g., house number, street, area)"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label htmlFor="pinCode" className="block text-gray-700 font-medium mb-1">
                        Pin Code
                      </label>
                      <input
                        id="pinCode"
                        type="text"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="Enter 6-digit pin code"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        maxLength="6"
                      />
                    </div>
                    {addressError && (
                      <p className="text-red-500 text-sm">{addressError}</p>
                    )}
                    <button
                      onClick={handleConfirmAddress}
                      className="w-full bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
                    >
                      Confirm Address
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {!scriptLoaded && !scriptError && <p>Loading Razorpay...</p>}
                    {scriptError && <p className="text-red-500">{scriptError}</p>}
                  </div>
                  <button
                    onClick={handlePayment}
                    disabled={loading || !scriptLoaded || cartItems.length === 0 || !addressConfirmed}
                    className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
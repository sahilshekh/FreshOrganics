import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartContext } from './CartContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(null);
  const navigate = useNavigate();

  console.log('Cart items:', cartItems);

  const totalPrice = cartItems
    .reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
    .toFixed(2);

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

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please log in to proceed with payment');
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
            amount: parseFloat(totalPrice),
            userId: user.uid,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log('createOrder error:', errorData); // Log error response
        throw new Error(errorData.error || 'Failed to create order');
      }

      const { orderId, amount, currency } = await response.json();
      console.log('createOrder response:', { orderId, amount, currency }); // Log success response

      const options = {
        key: 'rzp_live_54RIreCvC4vdEr', 
        amount,
        currency,
        name: 'Organic Store',
        description: 'Cart Payment',
        order_id: orderId,
        handler: async (response) => {
          console.log('Razorpay payment success:', response); // Log success response
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
            console.log('verifyPayment error:', errorData); // Log error
            throw new Error(errorData.message || 'Failed to verify payment');
          }

          const verifyResult = await verifyResponse.json();
          if (verifyResult.isOk) {
            await setDoc(doc(db, 'transactions', response.razorpay_payment_id), {
              userId: user.uid,
              orderId,
              paymentId: response.razorpay_payment_id,
              amount: totalPrice,
              currency,
              cartItems,
              status: 'success',
              timestamp: new Date(),
            });

            await setDoc(doc(db, 'carts', user.uid), { userId: user.uid, items: [] });
            setCartItems([]);
            toast.success('Payment successful!');
            navigate('/order-confirmation');
          } else {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
          contact: user.phoneNumber || '9999999999',
        },
        theme: { color: '#16a34a' },
      };

      console.log('Razorpay options:', options); // Log options
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', (response) => {
        console.log('Razorpay payment failed:', response); // Log failure details
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

              <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Total: ₹{totalPrice}</h2>
                <div className="flex items-center space-x-4">
                  {!scriptLoaded && !scriptError && <p>Loading Razorpay...</p>}
                  {scriptError && <p className="text-red-500">{scriptError}</p>}
                  <button
                    onClick={handlePayment}
                    disabled={loading || !scriptLoaded || cartItems.length === 0}
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
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Add ArrowRight import
import { db } from '../firebase'; // Fixed path
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Order History</h1>
          <p className="text-base md:text-lg">View your past orders and track deliveries.</p>
        </div>
      </section>

      {/* Orders Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/profile"
            className="inline-flex items-center text-green-700 hover:text-green-600 font-medium mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </Link>

          {loading ? (
            <div className="text-center">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
              <p className="text-gray-600">You haven’t placed any orders yet.</p>
              <Link
                      to="/mango-varieties"
                className="inline-flex items-center bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 mt-4"
              >
                Start Shopping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {order.createdAt?.toDate().toLocaleString() || 'Date not available'}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="text-gray-600">
                      <strong>Total:</strong> ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Items:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
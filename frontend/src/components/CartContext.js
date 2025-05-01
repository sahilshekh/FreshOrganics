import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    console.log('Fetching cart for user:', user?.uid);
    if (!user) return;
    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);
      const data = cartDoc.exists() ? cartDoc.data().items || [] : [];
      // Ensure quantity is a number
      const sanitizedItems = data.map(item => ({
        ...item,
        quantity: item.quantity ? Number(item.quantity) : 1,
      }));
      setCartItems(sanitizedItems);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
    }
  };

  const addToCart = async (product) => {
    console.log('Adding to cart:', product);
    if (!user) {
      toast.error('Please log in to add items to cart');
      return;
    }
    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);
      let items = cartDoc.exists() ? cartDoc.data().items || [] : [];

      const existingItemIndex = items.findIndex((item) => item.id === product.id);
      if (existingItemIndex !== -1) {
        items[existingItemIndex] = {
          ...items[existingItemIndex],
          quantity: (items[existingItemIndex].quantity || 0) + (product.quantity || 1),
        };
      } else {
        items.push({ ...product, quantity: product.quantity || 1 });
      }

      await setDoc(cartRef, { items }, { merge: true });
      setCartItems(items);
      console.log('Product added successfully, showing toast:', product.name);
      toast.success(`${product.name} (x${product.quantity || 1}) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      if (navigator.onLine) {
        toast.error('Failed to add item to cart due to a server issue');
      } else {
        toast.error('You are offline. Item will be added when online.');
      }
    }
  };

  const addBundleToCart = async (products) => {
    if (!user) {
      toast.error('Please log in to add items to cart');
      return;
    }
    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);
      let items = cartDoc.exists() ? cartDoc.data().items || [] : [];

      products.forEach((product) => {
        const existingItemIndex = items.findIndex((item) => item.id === product.id);
        if (existingItemIndex !== -1) {
          items[existingItemIndex] = {
            ...items[existingItemIndex],
            quantity: (items[existingItemIndex].quantity || 0) + (product.quantity || 1),
          };
        } else {
          items.push({ ...product, quantity: product.quantity || 1 });
        }
      });

      await setDoc(cartRef, { items }, { merge: true });
      setCartItems(items);
      console.log('Bundle added successfully, showing toast');
      toast.success('Bundle added to cart!');
    } catch (error) {
      console.error('Error adding bundle to cart:', error.message);
      if (navigator.onLine) {
        toast.error('Failed to add bundle to cart due to a server issue');
      } else {
        toast.error('You are offline. Bundle will be added when online.');
      }
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, addBundleToCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
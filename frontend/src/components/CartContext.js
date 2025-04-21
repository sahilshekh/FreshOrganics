import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage for persistence across sessions
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a single product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Add multiple products (e.g., bundle) to the cart
  const addBundleToCart = (products) => {
    setCartItems((prevItems) => {
      let updatedItems = [...prevItems];
      products.forEach((product) => {
        const existingItem = updatedItems.find((item) => item.id === product.id);
        if (existingItem) {
          updatedItems = updatedItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedItems.push({ ...product, quantity: 1 });
        }
      });
      return updatedItems;
    });
    toast.success('Bundle added to cart!');
  };

  // Calculate total item count (sum of quantities)
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, addBundleToCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
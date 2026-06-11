import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Load state from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('coffe_cart');
    const savedWishlist = localStorage.getItem('coffe_wishlist');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save state to local storage when changed
  useEffect(() => {
    localStorage.setItem('coffe_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('coffe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const gst = cartTotal * 0.05; // 5% GST
  const grandTotal = cartTotal + gst;

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      cartTotal,
      gst,
      grandTotal,
      cartCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

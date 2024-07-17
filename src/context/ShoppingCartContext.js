// ShoppingCartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [allowedToAdd, setAllowedToAdd] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Function to save cart items to local storage
  const saveCartToLocalStorage = (cartItem) => {
    const savedCartItems = fetchCartFromLocalStorage();
    const updatedCartItems = [...savedCartItems, cartItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Function to fetch cart items from local storage
  const fetchCartFromLocalStorage = () => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  };

  // Update local storage whenever a new item is added to the cart
  useEffect(() => {
    if (allowedToAdd) {
      setAllowedToAdd(false);
      if (cartItems.length > 0) {
        const newItem = cartItems[cartItems.length - 1];
        saveCartToLocalStorage(newItem);
      }
    }
  }, [cartItems]);

  // Fetch cart items from local storage on component mount
  useEffect(() => {
    const fetchedCartItems = fetchCartFromLocalStorage();
    setCartItems(fetchedCartItems);
  }, []);

  const [showToast, setShowToast] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addItemToCart = (item) => {
    if (cartItems) {
      setAllowedToAdd(true);
      const newToast = { id: Date.now(), item: item };
      setToasts([...toasts, newToast]);
      setShowToast(true);
      setCartItems([...cartItems, item]);
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 100);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        setCartItems,
        toasts,
        setToasts,
        showToast,
        isButtonDisabled,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

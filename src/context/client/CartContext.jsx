import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState([{ id: "", value: 0 }]);
  const [messages, setMessages] = useState([]);

  // Calculate total from cartItems
  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (coffee) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === coffee.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...coffee, quantity: 1 }];
      }
    });

    const messageId = Date.now();
    const newMessage = {
      id: messageId,
      text: `${coffee.name} added to cart!`,
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }, 3000);
  };

  const removeFromCart = (coffeeId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== coffeeId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handlePurchase = () => {
    setCartItems([]);
    // Add any purchase logic here
  };

  return (
    <CartContext.Provider
      value={{
        messages,
        removeFromCart,
        quantity,
        total, // This is now calculated from cartItems
        cartItems,
        setCartItems,
        addToCart,
        clearCart,
        handlePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("nakamasCart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(
      "nakamasCart",
      JSON.stringify(newCart)
    );
  };

  const addToCart = (product) => {
    console.log("ADDING:", product);

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      const newCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );

      saveCart(newCart);
      return;
    }

    const newCart = [
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ];

    saveCart(newCart);
  };

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    );

    saveCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(
      (item) => item._id !== id
    );

    saveCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce(
      (count, item) =>
        count + item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export {
  CartProvider,
  useCart
};
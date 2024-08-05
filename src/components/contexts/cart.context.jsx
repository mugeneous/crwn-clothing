import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// const removeCartItem = (cartItems, cartItemToRemove) => {
//   // if (cartItemToRemove.quantity > 1) {
//   //   return cartItems.map((item) =>
//   //     item.id === cartItemToRemove.id
//   //       ? { ...item, quantity: item.quantity - 1 }
//   //       : item
//   //   );
//   // } else {
//   //   return cartItems.filter((item) => item.id !== cartItemToRemove.id);
//   // }

//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
//   }

//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

const decrementCartItem = (cartItems, cartItemToRemove) => {
  if (!cartItemToRemove || !cartItemToRemove.id) {
    throw new Error("Invalid cart item to remove");
  }

  const itemExists = cartItems.some((item) => item.id === cartItemToRemove.id);
  if (!itemExists) {
    console.warn(`Item with id ${cartItemToRemove.id} not found in cart`);
    return cartItems;
  }

  return cartItems.reduce((acc, item) => {
    if (item.id !== cartItemToRemove.id) {
      acc.push(item);
    } else if (item.quantity > 1) {
      acc.push({ ...item, quantity: item.quantity - 1 });
    }
    return acc;
  }, []);
};

const deleteCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartTotalQuantity: 0,
  decrementQuantity: () => {},
  removeCartItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  useEffect(() => {
    const newCartTotalQuantity = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartTotalQuantity(newCartTotalQuantity);
  }, [cartItems]);

  const removeCartItem = (cartItemToRemove) => {
    setCartItems(deleteCartItem(cartItems, cartItemToRemove));
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decrementQuantity = (cartItemToRemove) => {
    setCartItems(decrementCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartTotalQuantity,
    decrementQuantity,
    removeCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

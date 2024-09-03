import { createContext, useReducer } from "react";

import { createAction } from "../../utils/reducer/reducer.utils";

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
  totalPrice: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotalQuantity: 0,
  totalPrice: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartTotalQuantity, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  console.log(cartItems);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotalQuantity = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newTotalPrice = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotalQuantity: newCartTotalQuantity,
        totalPrice: newTotalPrice,
      })
    );
  };

  const removeCartItem = (cartItemToRemove) => {
    const newCartItems = deleteCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const decrementQuantity = (cartItemToRemove) => {
    const newCartItems = decrementCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction("SET_IS_CART_OPEN", bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartTotalQuantity,
    decrementQuantity,
    removeCartItem,
    totalPrice,
    cartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

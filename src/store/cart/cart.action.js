import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, newCartItems);
};

const deleteCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const deleteItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = deleteCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.DELETE_ITEM_FROM_CART, newCartItems);
};

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

export const decrementCartItemQuantity = (cartItems, cartItemToDecrement) => {
  const newCartItem = decrementCartItem(cartItems, cartItemToDecrement);
  return createAction(CART_ACTION_TYPES.DECREMENT_QUANTITY, newCartItem);
};

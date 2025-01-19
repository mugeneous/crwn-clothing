import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
import { CartItems } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";
import { ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { withMatcher } from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItems[],
  productToAdd: CategoryItem
): CartItems[] => {
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

const deleteCartItem = (
  cartItems: CartItems[],
  cartItemToRemove: CartItems
) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const decrementCartItem = (
  cartItems: CartItems[],
  cartItemToRemove: CartItems
) => {
  return cartItems.reduce((acc: CartItems[], item: CartItems) => {
    if (item.id !== cartItemToRemove.id) {
      acc.push(item);
    } else if (item.quantity > 1) {
      acc.push({ ...item, quantity: item.quantity - 1 });
    }
    return acc;
  }, []);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type AddItemToCart = ActionWithPayload<
  CART_ACTION_TYPES.ADD_ITEM_TO_CART,
  CartItems[]
>;

export type DeleteItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.DELETE_ITEM_FROM_CART,
  CartItems[]
>;

export type DecrementCartItemQuantity = ActionWithPayload<
  CART_ACTION_TYPES.DECREMENT_QUANTITY,
  CartItems[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const addItemToCart = withMatcher(
  (cartItems: CartItems[] = [], productToAdd: CategoryItem): AddItemToCart => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, newCartItems);
  }
);

export const deleteItemFromCart = withMatcher(
  (
    cartItems: CartItems[] = [],
    cartItemToRemove: CartItems
  ): DeleteItemFromCart => {
    const newCartItems = deleteCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.DELETE_ITEM_FROM_CART, newCartItems);
  }
);

export const decrementCartItemQuantity = withMatcher(
  (
    cartItems: CartItems[] = [],
    cartItemToDecrement: CartItems
  ): DecrementCartItemQuantity => {
    const newCartItem = decrementCartItem(cartItems, cartItemToDecrement);
    return createAction(CART_ACTION_TYPES.DECREMENT_QUANTITY, newCartItem);
  }
);

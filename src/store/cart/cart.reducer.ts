import { CartItems } from "./cart.types";
import { AnyAction } from "redux";
import {
  addItemToCart,
  setIsCartOpen,
  deleteItemFromCart,
  decrementCartItemQuantity,
} from "./cart.action";
export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItems[];
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  if (addItemToCart.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  if (deleteItemFromCart.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  if (decrementCartItemQuantity.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  return state;
  // switch (type) {
  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: payload,
  //     };
  //   case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };
  //   case CART_ACTION_TYPES.DELETE_ITEM_FROM_CART:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };
  //   case CART_ACTION_TYPES.DECREMENT_QUANTITY:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };
  //   default:
  //     return state;
  // }
};

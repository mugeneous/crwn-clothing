import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  ADD_ITEM_TO_CART = "cart/ADD_ITEM_TO_CART",
  DECREMENT_QUANTITY = "cart/DECREMENT_QUANTITY",
  DELETE_ITEM_FROM_CART = "cart/DELETE_ITEM_FROM_CART",
}

export type CartItems = CategoryItem & {
  quantity: number;
};

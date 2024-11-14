// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { CartContext } from "../contexts/cart.context";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  decrementCartItemQuantity,
  deleteItemFromCart,
} from "../../store/cart/cart.action";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  // const { removeCartItem, decrementQuantity, addItemToCart } =
  //   useContext(CartContext);
  const incrementQuantityHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const decrementQuantityHandler = () =>
    dispatch(decrementCartItemQuantity(cartItems, cartItem));
  const clearItemFromCart = () =>
    dispatch(deleteItemFromCart(cartItems, cartItem));
  // const incrementQuantityHandler = () =>

  // const incrementQuantityHandler = () => addItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementQuantityHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementQuantityHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemFromCart}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;

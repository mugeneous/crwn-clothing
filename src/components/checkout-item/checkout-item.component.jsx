import { useContext } from "react";

import { CartContext } from "../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { removeCartItem, decrementQuantity, addItemToCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const incrementQuantityHandler = () => addItemToCart(cartItem);
  const decrementQuantityHandler = () => decrementQuantity(cartItem);

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
      <span className="remove-button" onClick={() => removeCartItem(cartItem)}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;

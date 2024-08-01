import { useContext } from "react";

import { CartContext } from "../contexts/cart.context";

import CartIconLogo from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { cartTotalQuantity } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <CartIconLogo className="shopping-icon" />
      <span className="item-count">{cartTotalQuantity}</span>
    </div>
  );
};

export default CartIcon;

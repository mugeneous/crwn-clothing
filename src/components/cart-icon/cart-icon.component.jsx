import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CartContext } from "../contexts/cart.context";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import CartIconLogo from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  // const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { cartTotalQuantity } = useContext(CartContext);
  // const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  const toggleIsCartOpen = (isCartOpen) => dispatch(setIsCartOpen(isCartOpen));

  return (
    <div
      className="cart-icon-container"
      onClick={() => toggleIsCartOpen(isCartOpen)}
    >
      <CartIconLogo className="shopping-icon" />
      <span className="item-count">{cartTotalQuantity}</span>
    </div>
  );
};

export default CartIcon;

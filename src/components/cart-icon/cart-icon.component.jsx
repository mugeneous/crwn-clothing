// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { CartContext } from "../contexts/cart.context";

import {
  selectIsCartOpen,
  selectTotalItem,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import CartIconLogo from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const totalItem = useSelector(selectTotalItem);

  // const { cartTotalQuantity } = useContext(CartContext);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <CartIconLogo className="shopping-icon" />
      <span className="item-count">{totalItem}</span>
    </div>
  );
};

export default CartIcon;

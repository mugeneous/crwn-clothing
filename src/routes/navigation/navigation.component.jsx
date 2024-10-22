import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { CartContext } from "../../components/contexts/cart.context";
import { signOutUser } from "../../utils/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector";

import CrownLogo from "../../assets/crown.svg";
import { useSelector } from "react-redux";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="flex justify-between w-full h-20 mb-6">
        <Link className="flex items-center justify-center pl-7" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="flex items-center justify-end w-1/2 ">
          <Link className="px-4" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="px-4" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="px-4" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../components/contexts/user.context";
import { CartContext } from "../../components/contexts/cart.context";
import { signOutUser } from "../../utils/firebase.utils";

import CrownLogo from "../../assets/crown.svg";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="h-20 w-full flex justify-between mb-6">
        <Link className="flex items-center justify-center pl-7" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className=" w-1/2 flex items-center justify-end">
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

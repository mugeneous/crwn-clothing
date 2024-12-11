import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import CrownLogo from "../../assets/crown.svg";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

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

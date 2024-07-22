import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../components/contexts/user.context";

import crownLogo from "../../assets/crown.svg";
import "./navigation.style.scss";
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="navigation">
        <div className="logo-container">
          <Link className="logo-container" to="/">
            <img src={crownLogo} className="logo" />
          </Link>
        </div>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

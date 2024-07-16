import { Link, Outlet } from "react-router-dom";

import crownLogo from "../../assets/crown.svg";
import "./navigation.style.scss";

const Navigation = () => {
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
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

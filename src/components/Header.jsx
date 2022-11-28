import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import NavButton from "./navbar/NavButton";
import facade from "../facades/apiFacade";

function Header({ loggedIn, setLoggedIn, setCreateAccountClicked }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navbarItemManager = (pathname) => {
    if (pathname === "/") {
      return (
        <nav className="topnav">
          <div className="left-side-navbar">
            <NavButton isLogo />

            {loggedIn && (
              <>
                <NavButton text="My Trips" iconClass="fas fa-car" to="/mytrips" />
              </>
            )}
          </div>

          <div className="right-side-navbar">
            <NavButton text="About" iconClass="fas fa-seedling" to="/about" />
            {!loggedIn ? (
              <NavButton
                text="Sign In"
                onClick={() => {
                  setCreateAccountClicked(false);
                }}
                to="/login"
              />
            ) : (
              <>
                <div className="btn-login">
                  <NavLink
                    style={{ paddingRight: "10px", cursor: "pointer" }}
                    to="/profile"
                  >
                    Hello, {facade.getUsername()} <i className="fas fa-user-circle"></i>
                  </NavLink>

                  <NavButton
                    text="Sign Out"
                    onClick={() => {
                      facade.logout();
                      setLoggedIn(false);
                      navigate("/");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      );
    } else if (pathname === "/login" || pathname === "/register") {
      return (
        <nav className="topnav">
          <div className="left-side-navbar">
            <NavButton isLogo />
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="topnav">
          <div className="left-side-navbar">
            <NavButton isLogo />

            {loggedIn && (
              <>
                <NavButton text="My Trips" iconClass="fas fa-car" to="/mytrips" />
              </>
            )}
          </div>

          <div className="right-side-navbar">
            <NavButton text="About" iconClass="fas fa-seedling" to="/about" />
            {!loggedIn ? (
              <NavButton
                text="Sign In"
                onClick={() => {
                  setCreateAccountClicked(false);
                }}
                to="/login"
              />
            ) : (
              <>
                <div className="btn-login">
                  <NavLink
                    style={{ paddingRight: "10px", cursor: "pointer" }}
                    to="/profile"
                  >
                    Hello, {facade.getUsername()} <i className="fas fa-user-circle"></i>
                  </NavLink>
                  <NavButton
                    text="Sign Out"
                    onClick={() => {
                      facade.logout();
                      setLoggedIn(false);
                      navigate("/");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      );
    }
  };

  return navbarItemManager(location.pathname);
}

export default Header;

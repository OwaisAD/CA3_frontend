import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import NavButton from "./navbar/NavButton";
import facade from "../facades/apiFacade";

function Header({ loggedIn, setErrorMsg, setLoggedIn, setCreateAccountClicked }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="topnav">
      <div className="left-side-navbar">
        {location.pathname !== "/" && (
          <NavButton text="Home" iconClass="fas fa-home" to="/" isEnd />
        )}

        <NavButton text="About" iconClass="fas fa-seedling" to="/about" />

        {loggedIn && (
          <>
            <NavButton text="My Trips" iconClass="fas fa-car" to="/mytrips" />
          </>
        )}
      </div>

      <div className="right-side-navbar">
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
              <a
                style={{ paddingRight: "10px", cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              >
                Hello, {facade.getUsername()} <i class="fas fa-user-circle"></i>
              </a>
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

export default Header;

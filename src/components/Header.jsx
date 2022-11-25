import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import LoggedInNavBar from "./LoggedInNavBar";
import { useNavigate } from "react-router-dom";
import NavButton from "./navbar/NavLink";

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
            text="Login"
            onClick={() => {
              setCreateAccountClicked(false);
            }}
            to="/login"
          />
      ) : (
        <>
          <LoggedInNavBar setLoggedIn={setLoggedIn} />
        </>
      )}
      </div>
    </nav>
  );
}

export default Header;

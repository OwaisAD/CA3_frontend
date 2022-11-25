import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import Button from "./button/Button";
import LoggedInNavBar from "./LoggedInNavBar";
import { useNavigate } from "react-router-dom";
import NavButton from "./navbar/NavLink";

function Header({ loggedIn, setErrorMsg, setLoggedIn, setCreateAccountClicked }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="topnav">
      {location.pathname !== "/" && <NavButton text="Home" iconClass="fas fa-home" to="/" isEnd/>}

      <NavButton text="About" iconClass="fas fa-seedling" to="/about" />

      {loggedIn && (
        <>
          <NavButton text="My Trips" iconClass="fas fa-car" to="/mytrips" />
        </>
      )}

      {!loggedIn ? (
        <div className="login-container">
          
          <NavButton text="Login" onClick={() => {
              setCreateAccountClicked(false);
            }} to="/login"/>

    
        </div>
      ) : (
        <>
          <LoggedInNavBar setLoggedIn={setLoggedIn} />
        </>
      )}
    </nav>
  );
}

export default Header;

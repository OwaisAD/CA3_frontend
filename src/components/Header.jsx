import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import LoggedInNavBar from "./LoggedInNavBar";
import LoginButton from "./LoginButton";

function Header({ loggedIn, setErrorMsg, setLoggedIn, setCreateAccountClicked }) {
  return (
    <nav className="topnav">
      <NavLink to="/" end>
        <i class="fas fa-home"></i> Home
      </NavLink>

      <NavLink to="/about">
        <i class="fas fa-seedling"></i> About
      </NavLink>

      {loggedIn && (
        <>
          <NavLink to="/mytrips">
            <i class="fas fa-car"></i> My Trips
          </NavLink>
        </>
      )}

      {!loggedIn ? (
        <LoginButton setCreateAccountClicked={setCreateAccountClicked} />
      ) : (
        <>
          <LoggedInNavBar setLoggedIn={setLoggedIn} />
        </>
      )}
    </nav>
  );
}

export default Header;

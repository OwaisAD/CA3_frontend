import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import LoggedInNavBar from "./LoggedInNavBar";
import LoginButton from "./LoginButton";

function Header({ loggedIn, setErrorMsg, setLoggedIn, setCreateAccountClicked }) {
  return (
    <nav className="topnav">
      <NavLink to="/" end>
        <i className="fa fa-fw fa-home"></i> Home
      </NavLink>

      <NavLink to="/search">
        <i className="fa fa-fw fa-search"></i> Search
      </NavLink>

      {loggedIn && (
        <>
          <NavLink to="/watchlist">
            <i className="fa fa-fw fa-film"></i> Watchlist
          </NavLink>
        </>
      )}

      {loggedIn && (
        <>
          <NavLink to="/profile">
            <i className="fa fa-fw fa-id-badge"></i> Profile
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

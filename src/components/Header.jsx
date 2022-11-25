import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import Button from "./button/Button";
import LoggedInNavBar from "./LoggedInNavBar";
import { useNavigate } from "react-router-dom";

function Header({ loggedIn, setErrorMsg, setLoggedIn, setCreateAccountClicked }) {
  const navigate = useNavigate();

  return (
    <nav className="topnav">
      <NavLink to="/" end>
        <i className="fas fa-home"></i> Home
      </NavLink>

      <NavLink to="/about">
        <i className="fas fa-seedling"></i> About
      </NavLink>

      {loggedIn && (
        <>
          <NavLink to="/mytrips">
            <i className="fas fa-car"></i> My Trips
          </NavLink>
        </>
      )}

      {!loggedIn ? (
        <div className="login-container">
          <Button text="Login"  onClick={() => {
            setCreateAccountClicked(false);
            navigate("/login");
          }} isHeaderLogin={true}/>
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

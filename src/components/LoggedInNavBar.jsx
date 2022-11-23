import { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import { useNavigate } from "react-router-dom";

const LoggedInNavBar = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="btn-login">
        <a style={{ paddingRight: "10px", cursor: "pointer" }} onClick={() => navigate("/profile")}>
          Hello, {facade.getUsername()}
          {' '}<i class="fas fa-user-circle"></i>
        </a>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default LoggedInNavBar;

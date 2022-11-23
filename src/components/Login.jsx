import React, { useState, useEffect } from "react";
import LoginComponent from "./login/LoginComponent";
import Image from "../images/cinewatch2.png";

const Login = ({ setLoggedIn, setErrorMsg, errorMsg }) => {
  return (
    <>
      <img
        src={Image}
        alt="cinewatch logo"
        style={{
          maxWidth: "120px",
          margin: "30px auto 20px",
          display: "block",
        }}
        className="logo"
      />
      <>
        <LoginComponent setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
      </>
    </>
  );
};

export default Login;

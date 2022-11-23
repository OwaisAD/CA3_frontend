import React, { useState, useEffect } from "react";
import CreateAccountComponent from "./login/CreateAccountComponent";
import Image from "../images/ecodrive-logo.png";

const Register = ({ setLoggedIn, setErrorMsg, errorMsg }) => {
  return (
    <>
      <img
        src={Image}
        alt="cinewatch logo"
        style={{
          maxWidth: "160px",
          margin: "30px auto 20px",
          display: "block",
        }}
        className="logo"
      />
      <CreateAccountComponent
        setLoggedIn={setLoggedIn}
        setErrorMsg={setErrorMsg}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default Register;

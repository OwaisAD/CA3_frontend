import React, { useState, useEffect } from "react";
import CreateAccountComponent from "./login/CreateAccountComponent";
import Image from "../images/cinewatch2.png";

const Register = ({ setLoggedIn, setErrorMsg, errorMsg }) => {
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
      <CreateAccountComponent
        setLoggedIn={setLoggedIn}
        setErrorMsg={setErrorMsg}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default Register;

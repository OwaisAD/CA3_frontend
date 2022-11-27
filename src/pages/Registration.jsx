import React from "react";
import CreateAccountComponent from "../components/login/CreateAccountComponent";

const Registration = ({ setLoggedIn, setErrorMsg, errorMsg }) => {
  return (
    <CreateAccountComponent
      setLoggedIn={setLoggedIn}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
    />
  );
};

export default Registration;

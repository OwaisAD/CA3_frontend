import React from "react";
import LoginComponent from "../components/login/LoginComponent";

const Login = ({ setLoggedIn, setErrorMsg }) => {
  return <LoginComponent setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />;
};

export default Login;

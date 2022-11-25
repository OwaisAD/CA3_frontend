import React, { useState, useEffect } from "react";
import LoginComponent from "../components/login/LoginComponent";
import PageWrapper from "../components/wrapper/PageWrapper";
import Image from "../images/ecodrive-logo.png";

const Login = ({ setLoggedIn, setErrorMsg, errorMsg }) => {
  return (
    <PageWrapper>
        <LoginComponent setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
    </PageWrapper>
  );
};

export default Login;

import React from "react";
import LoginComponent from "../components/login/LoginComponent";
import PageWrapper from "../components/wrapper/PageWrapper";

const Login = ({ setLoggedIn, setErrorMsg }) => {
  return (
    <PageWrapper>
        <LoginComponent setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
    </PageWrapper>
  );
};

export default Login;

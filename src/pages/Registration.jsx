import React from "react";
import CreateAccountComponent from "../components/login/CreateAccountComponent";
import PageWrapper from "../components/wrapper/PageWrapper";

const Registration = ({ setLoggedIn, setErrorMsg, errorMsg }) => {
  return (
    <PageWrapper>
      <CreateAccountComponent
        setLoggedIn={setLoggedIn}
        setErrorMsg={setErrorMsg}
        errorMsg={errorMsg}
      />
    </PageWrapper>
  );
};

export default Registration;

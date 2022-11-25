import React, { useState, useEffect } from "react";
import CreateAccountComponent from "../components/login/CreateAccountComponent";
import PageWrapper from "../components/wrapper/PageWrapper";
import Image from "../images/ecodrive-logo.png";

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

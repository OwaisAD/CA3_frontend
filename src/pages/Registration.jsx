import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccountComponent from "../components/login/CreateAccountComponent";

const Registration = ({ loggedIn, setLoggedIn, setErrorMsg, errorMsg }) => {

  const navigate = useNavigate()

    useEffect(() => {
      if(loggedIn)
        navigate("/")
    })

  return (
    <CreateAccountComponent
      setLoggedIn={setLoggedIn}
      setErrorMsg={setErrorMsg}
      errorMsg={errorMsg}
    />
  );
};

export default Registration;

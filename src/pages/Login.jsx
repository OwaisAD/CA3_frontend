import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/login/LoginComponent";

const Login = ({loggedIn, setLoggedIn, setErrorMsg }) => {
  const navigate = useNavigate()

    useEffect(() => {
      if(loggedIn)
        navigate("/")
    })

    return (
      <>
        <LoginComponent setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
      </>
    );
  }


export default Login;

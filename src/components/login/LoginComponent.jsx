import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../../facades/apiFacade";

const LoginComponent = ({
  setLoggedIn,
  setErrorMsg,
  createAccountClicked,
  setCreateAccountClicked,
}) => {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [errorMsgLogin, setErrorMsgLogin] = useState("");

  const navigate = useNavigate();

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const login = async (user, pass) => {
    await facade
      .login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        navigate("/mytrips");
      })
      .catch((err) => {
        err.fullError.then((e) => setErrorMsgLogin(e.message));
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="login-component-container">
      <div className="title">
        <h2>Login</h2>
        <p>Please login to continue</p>
      </div>
      <form onChange={onChange}>
        <label
          htmlFor="username"
          style={{ float: "left", fontSize: "16px", fontWeight: "lighter", marginLeft: "1px" }}
        >
          Username
        </label>
        <input type="text" placeholder="Enter username" id="username" required />{" "}
        <label
          htmlFor="password"
          style={{ float: "left", fontSize: "16px", fontWeight: "lighter", marginLeft: "1px" }}
        >
          Password
        </label>
        <input type="password" placeholder="Enter password" id="password" required />
        <button className="glow-on-hover sign-in-button" onClick={performLogin}>
          Sign in
        </button>
      </form>

      <p style={{ padding: "5px 0px" }}>Don't have an account?</p>
      <a style={{ color: "#0000EE", cursor: "pointer" }} onClick={() => navigate("/register")}>
        Sign up here
      </a>

      <h3 style={{ color: "red" }}>{errorMsgLogin}</h3>
    </div>
  );
};

export default LoginComponent;

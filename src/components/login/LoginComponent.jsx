import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../../facades/apiFacade";
import Button from "../button/Button";

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
        navigate("/trips");
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMsgLogin(e.message));
        } else {
          setErrorMsgLogin("Network error");
        }
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-component-left-side"></div>
      <div className="login-component-right-side">
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
            <div style={{ marginBottom: "40px" }}>
              <a style={{ color: "#0000EE", cursor: "pointer", float: "right", fontSize: "12px" }}>
                Forgot your password?
              </a>
            </div>
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button text="Sign in" onClick={performLogin} isLogin={true} />
            </div>
          </form>

          <p style={{ padding: "5px 0px", textAlign: "center" }}>
            {"Don't have an account? "}
            <a
              style={{ color: "#0000EE", cursor: "pointer", textAlign: "center" }}
              onClick={() => navigate("/register")}
            >
              Sign up
            </a>
          </p>

          <h3 style={{ color: "red" }}>{errorMsgLogin}</h3>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

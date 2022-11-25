import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../../facades/apiFacade";
import { DatePicker, getAge } from "../DatePicker";

const CreateAccountComponent = ({ setErrorMsg, errorMsg }) => {
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    passwordRepeated: "",
    age: "",
  });

  // the age from input date converter should be in a utils js class or jsx component for the date picker
  const performCreateUser = (evt) => {
    evt.preventDefault();
    if (
      loginCredentials.username === "" ||
      loginCredentials.password === "" ||
      loginCredentials.passwordRepeated === "" ||
      loginCredentials.age === ""
    ) {
      setErrorMsg("Please fill out the form");
      return;
    }

    if (loginCredentials.password !== loginCredentials.passwordRepeated) {
      setErrorMsg("Passwords don't match");
      return;
    }
    createUser(loginCredentials.username, loginCredentials.password, loginCredentials.age);
  };

  const createUser = (user, pass, age) => {
    facade
      .createUser(user, pass, age)
      .then(() => {
        // SET SOME KIND OF SUCCESS MESSAGE
        navigate("/login");
      })
      .catch((err) => {
        err.fullError.then((e) => setErrorMsg(e.message));
      });
  };

  const onChange = (evt) => {
    if (evt.target.id === "age") {
      let age = getAge(evt.target.value);
      console.log("calculated age:", age)
      if (age >= 18 && age <= 125) {
        setLoginCredentials({
          ...loginCredentials,
          [evt.target.id]: age,
        });
        console.log(loginCredentials);
      }
    } else {
      setLoginCredentials({
        ...loginCredentials,
        [evt.target.id]: evt.target.value,
      });
    }
  };

  return (
    <div>
      <div className="create-user-component-container">
        <div className="title">
          <h2>Create account</h2>
          <p>Please fill out the following fields</p>
        </div>
        <form onChange={onChange}>
          <label
            htmlFor="username"
            style={{
              float: "left",
              fontSize: "16px",
              fontWeight: "lighter",
              marginLeft: "1px",
            }}
          >
            Username
          </label>
          <input type="text" placeholder="Enter username" id="username" required />{" "}
          <label
            htmlFor="email"
            style={{
              float: "left",
              fontSize: "16px",
              fontWeight: "lighter",
              marginLeft: "1px",
            }}
          >
            Email
          </label>
          <input type="email" placeholder="Enter email" id="email" required />
          <label
            htmlFor="password"
            style={{
              float: "left",
              fontSize: "16px",
              fontWeight: "lighter",
              marginLeft: "1px",
            }}
          >
            Password
          </label>
          <input type="password" placeholder="Enter password" id="password" required />
          <label
            htmlFor="password"
            style={{
              float: "left",
              fontSize: "16px",
              fontWeight: "lighter",
              marginLeft: "2px",
            }}
          >
            Confirm password
          </label>
          <input
            type="password"
            placeholder="Enter password again"
            id="passwordRepeated"
            required
          />
          <div>
            <label
              htmlFor="age"
              style={{
                float: "left",
                fontSize: "16px",
                fontWeight: "lighter",
                marginLeft: "2px",
              }}
            >
              Please enter your birthdate{" "}
            </label>

            <DatePicker/>

            <div style={{ marginTop: "15px" }}>
              <input
                type="checkbox"
                style={{
                  height: "2em",
                  width: "2em",
                  verticalAlign: "middle",
                  marginRight: "10px",
                }}
              />
              <label htmlFor="checkbox">
                I agree to these{" "}
                <a
                  target="_blank"
                  style={{ textDecoration: "none", color: "#0000EE", cursor: "pointer" }}
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button className="glow-on-hover create-button" onClick={performCreateUser}>
            Create your EcoDrive account
          </button>
        </form>

        <p>Already have an account?</p>
        <a style={{ color: "#0000EE", cursor: "pointer" }} onClick={() => navigate("/login")}>
          Log in here
        </a>

        <h3 style={{ color: "red" }}>{errorMsg}</h3>
      </div>
    </div>
  );
};

export default CreateAccountComponent;

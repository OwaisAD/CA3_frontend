import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../../facades/apiFacade";

const CreateAccountComponent = ({
  createAccountClicked,
  setCreateAccountClicked,
  setErrorMsg,
  errorMsg,
}) => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    passwordRepeated: "",
    age: "",
  });
  //const [error, setError] = useState({ username: "", password: "", passwordRepeated: "", age: "" }) //should be used to handling the form errors....
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1); //January is 0!
  var minimum_yyyy = today.getFullYear() - 120;
  var maximum_yyyy = today.getFullYear() - 13;

  const minimumDate = minimum_yyyy + "-" + mm + "-" + dd; // set because maximum age is 120
  const maximumDate = maximum_yyyy + "-" + mm + "-" + dd; // set because minimum age is 13

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
      .then((data) => {
        // SET SOME KIND OF SUCCESS MESSAGE
        navigate("/login");
      })
      .catch((err) => {
        err.fullError.then((e) => setErrorMsg(e.message));
      });
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onChange = (evt) => {
    if (evt.target.id === "age") {
      let age = getAge(evt.target.value);
      console.log(age);
      setLoginCredentials({
        ...loginCredentials,
        [evt.target.id]: age,
      });
    } else {
      setLoginCredentials({
        ...loginCredentials,
        [evt.target.id]: evt.target.value,
      });
    }
  };

  return (
    <div style={{marginBottom: "25px"}}>
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
            <label htmlFor="age" style={{
              float: "left",
              fontSize: "16px",
              fontWeight: "lighter",
              marginLeft: "2px",
            }}>
              Please enter your birthdate{" "}
            </label>
            <input
              type="date"
              id="age"
              min={minimumDate}
              max={maximumDate}
              required
              style={{ float: "righ" }}
            />
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

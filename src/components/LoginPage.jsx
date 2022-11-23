import Login from "./LoginButton";
import LoggedIn from "./LoggedIn";
import facade from "../facades/apiFacade";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = async (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.message));
        } else {
          setErrorMessage("Network error");
        }
      });
  };

  return (
    <div>
      {!loggedIn ? (
        <>
          <Login login={login} />
          {errorMessage !== "" && <p>{errorMessage}</p>}
        </>
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default App;

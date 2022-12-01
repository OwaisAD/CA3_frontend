import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/404";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "./pages/Registration";
import Trips from "./pages/Trips";
import CreateTrip from "./pages/CreateTrip";
import Trip from "./pages/Trip";

const App = () => {
  let loggedInInitial = window.localStorage.getItem("isLoggedIn");

  const [loggedIn, setLoggedIn] = useState(loggedInInitial);
  const [errorMsg, setErrorMsg] = useState("");
  const [createAccountClicked, setCreateAccountClicked] = useState(false);
  const [editedProfile, setEditedProfile] = useState(false);

  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setErrorMsg={setErrorMsg}
        setCreateAccountClicked={setCreateAccountClicked}
        editedProfile={editedProfile}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/trips" element={<Trips />}/>
          <Route path="/trips/:id" element={<Trip />} />
          <Route path="/createtrip" element={<CreateTrip />} />

          <Route
            path="/profile"
            element={
              <Profile
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                editedProfile={editedProfile}
                setEditedProfile={setEditedProfile}
              />
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setErrorMsg={setErrorMsg}
              errorMsg={errorMsg}
              createAccountClicked={createAccountClicked}
              setCreateAccountClicked={setCreateAccountClicked}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
          }
        />

        <Route path="error" element={<Error errorMsg={errorMsg} />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import Unauthorized from "../components/Unauthorized";
import PageWrapper from "../components/wrapper/PageWrapper";

const Profile = ({ loggedIn, setLoggedIn }) => {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  // NEED TO HAVE A STATE THAT CHECKS WETHER A USER ADDED A MOVIE TO WATCHLIST, IF YES, THEN USEEFFECT SHOULD RELY ON THAT VARIABLE

  useEffect(() => {
    let isLoggedIn = facade.loggedIn();
    if (isLoggedIn) {
      setLoggedIn(true);
      facade.fetchData().then((data) => {
        setDataFromServer(data);
      });
    }
  }, []);

  return (
    <>
      {!loggedIn ? (
        <Unauthorized />
      ) : (
        <>
          <div className="profile-page">
            <div className="nine">
              <h1>
                Profile <span style={{ color: "white" }}>Change your personal information</span>{" "}
              </h1>
            </div>

            <div className="profile-container">
              <div className="profile-inner-container">
                <h3>Trip History</h3>
                {dataFromServer?.trips?.map((trip) => {
                  return (
                    <li key={trip.id}>
                      {trip.title} from {trip.year}
                    </li>
                  );
                })}
              </div>

              <div className="profile-inner-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <p>
                    <span style={{ fontWeight: "bold" }}>Username: </span>
                    {dataFromServer?.username}
                  </p>
                  <button>Edit</button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <p>
                    <span style={{ fontWeight: "bold" }}>Email: </span>
                    {dataFromServer?.email}
                  </p>
                  <button>Edit</button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Age: </span>
                    {dataFromServer?.age}
                  </p>
                  <button>Edit</button>
                </div>

                <button>Request password change</button>
              </div>
            </div>
          </div>
          <div className="overlay-about"></div>
        </>
      )}
    </>
  );
};

export default Profile;

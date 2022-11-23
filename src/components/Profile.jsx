import { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import Unauthorized from "./Unauthorized";

const Profile = ({ loggedIn, setLoggedIn, addedMovieToWatchlist }) => {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  // NEED TO HAVE A STATE THAT CHECKS WETHER A USER ADDED A MOVIE TO WATCHLIST, IF YES, THEN USEEFFECT SHOULD RELY ON THAT VARIABLE

  useEffect(() => {
    // her skal jeg tjekke for rollen og køre den rigitge fetch metode alt efter rollen
    let isLoggedIn = facade.loggedIn();
    if (isLoggedIn) {
      setLoggedIn(true);
      facade.fetchData().then((data) => {
        setDataFromServer(data);
        console.log(dataFromServer);
      });
    }
  }, [addedMovieToWatchlist]);

  return (
    <>
      {!loggedIn ? (
        <Unauthorized />
      ) : (
        <>
          <div class="nine">
            <h1>
              Profile <span style={{ color: "white" }}>Change your personal information</span>{" "}
            </h1>
          </div>
          <div className="profile-container">
            <div className="profile-inner-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <p>
                  Username: <span style={{ fontWeight: "bold" }}>{dataFromServer?.username}</span>
                </p>
                <button>Edit</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  Age: <span style={{ fontWeight: "bold" }}>{dataFromServer?.age}</span>
                </p>
                <button>Edit</button>
              </div>
            </div>
            <div className="profile-inner-container">
              <h3>Your movie list</h3>
              {dataFromServer?.movies?.map((movie) => {
                return (
                  <li key={movie.id}>
                    {movie.title} from {movie.year}
                  </li>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

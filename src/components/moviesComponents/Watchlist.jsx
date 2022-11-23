import { useState, useEffect } from "react";
import facade from "../../facades/apiFacade";
import Unauthorized from "../Unauthorized";
import MovieInWatchlist from "./MovieInWatchlist";

const Watchlist = ({
  loggedIn,
  setLoggedIn,
  addedMovieToWatchlist,
  setAddedMovieToWatchlist,
  dataFromServer,
  setDataFromServer,
}) => {
  const [removedMovie, setRemovedMovie] = useState(false);

  // NEED TO HAVE A STATE THAT CHECKS WETHER A USER ADDED A MOVIE TO WATCHLIST, IF YES, THEN USEEFFECT SHOULD RELY ON THAT VARIABLE

  useEffect(() => {
    // her skal jeg tjekke for rollen og køre den rigitge fetch metode alt efter rollen
    let isLoggedIn = facade.loggedIn();
    if (isLoggedIn) {
      setLoggedIn(true);
      facade
        .getUserMovies()
        .then((data) => {
          setDataFromServer(data);
          console.log(data);
        })
        .catch((err) => {});
    }
  }, [removedMovie]);

  return (
    <div>
      <>
        {!loggedIn ? (
          <Unauthorized />
        ) : (
          <>
            <div class="nine">
              <h1>
                Your Watchlist
                <span>
                  {" "}
                  <div className="circle">
                    <div className="movieCount">{dataFromServer?.length}</div>
                  </div>
                </span>
              </h1>
            </div>

            {dataFromServer?.length === 0 && (
              <p style={{ fontSize: "18px", textAlign: "center" }}>Your watchlist is empty</p>
            )}
            <div id="container-movies">
              {dataFromServer?.map((data, idx) => {
                return (
                  <MovieInWatchlist
                    key={idx}
                    movieData={data}
                    removedMovie={removedMovie}
                    setRemovedMovie={setRemovedMovie}
                  />
                );
              })}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Watchlist;

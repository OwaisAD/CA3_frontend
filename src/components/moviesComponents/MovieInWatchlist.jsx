import React from "react";
import facade from "../../facades/apiFacade";
import { useNavigate } from "react-router-dom";

const MovieInWatchlist = ({ movieData, removedMovie, setRemovedMovie }) => {
  const navigate = useNavigate();

  const categories = movieData.movie.genre;
  let categoriesList = categories.split(",");
  categoriesList = categoriesList.map(function (item) {
    return item.trim();
  });

  const handleMovieRemoval = (movieId) => {
    const isLoggedIn = facade.loggedIn();
    if (!isLoggedIn) {
      navigate("/");
    }

    facade.removeMovieFromUser(movieId).then((res) => {
      setRemovedMovie(!removedMovie);
    });
  };

  return (
    <div className="container-movie">
      <div className="movie">
        <div className="movie-inside front">
          <img src={movieData.movie.poster} />
        </div>

        <div className="movie-inside back">
          <div className="movie-details">
            <div className="movie-snap"></div>
            <h1>
              {movieData.movie.title}
              <br />
              <span>
                {movieData.movie.year} - {movieData.movie.runtime}
              </span>
            </h1>
            <ul className="movie-tags2">
              {categoriesList.map((category, idx) => {
                return (
                  <li key={idx}>
                    <a href="#">{category}</a>
                  </li>
                );
              })}
            </ul>
            <p className="movie-synopsis">{movieData.movie.plot}</p>
            <button
              className="remove-from-watchlist-button"
              onClick={() => handleMovieRemoval(movieData.movie.id)}
            >
              Remove from watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInWatchlist;

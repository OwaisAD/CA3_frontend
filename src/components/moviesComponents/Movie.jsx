import React from "react";
import facade from "../../facades/apiFacade";
import "../../styles/header.css";
import { useNavigate } from "react-router-dom";

const Movie = ({ movieData, addedMovieToWatchlist, setAddedMovieToWatchlist }) => {
  const navigate = useNavigate();

  const categories = movieData.movie.genre;
  let categoriesList = categories.split(",");
  categoriesList = categoriesList.map(function (item) {
    return item.trim();
  });

  const handleAddToUserWatchlist = () => {
    const isLoggedIn = facade.loggedIn();
    if (!isLoggedIn) {
      return navigate("/login");
    }

    if (
      window.confirm(`Are you sure you want to add ${movieData.movie.title} to your watchlist?`)
    ) {
      facade
        .addMovieToUser(movieData.movie.title, movieData.movie.year)
        .then((res) => {
          setAddedMovieToWatchlist(!addedMovieToWatchlist);
          navigate("/watchlist");
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="movie-container">
      <div className="title-container">{movieData.movie.title}</div>

      <div className="movie-info-with-poster">
        <img src={movieData.movie.poster} alt="movie poster" className="movie-poster-img" />
        <div className="movie-img-middle">
          <button className="movie-img-middle-text" onClick={handleAddToUserWatchlist}>
            Add to watchlist
          </button>
        </div>

        <div className="ribbon">
          <div className="ribbon-text">
            {movieData.movie.year}, {movieData.movie.runtime}
          </div>
        </div>
      </div>

      <ul className="movie-tags">
        {categoriesList.map((category, idx) => {
          return (
            <li key={idx}>
              <a href="#">{category}</a>
            </li>
          );
        })}
      </ul>

      <p className="movie-release">Released {movieData.movie.released}</p>

      <div className="summary-title">Summary</div>
      <div className="movie-plot-container">
        <p className="movie-plot">{movieData.movie.plot}</p>
        <p className="movie-actors">Actors: {movieData.movie.actors}</p>
      </div>

      <div className="movie-review-info">
        <h2 className="review-title">Review</h2>
        <div className="movie-review-info-inner-container">
          <p>{movieData.review.summary_short}</p>
          <div className="tag">
            <a href={movieData.review.url} target="_blank">
              {movieData.review.suggested_link_text}
            </a>
          </div>
        </div>
      </div>
      <i className="fa fa-fw fa-share" style={{ fontSize: "20px", marginTop: "20px" }}></i>
    </div>
  );
};

export default Movie;

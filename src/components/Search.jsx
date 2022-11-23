import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import facade from "../facades/apiFacade";
import Movie from "./moviesComponents/Movie";

function Search({ movieData, setMovieData }) {
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem("movie", movieData);
  }, [movieData]);

  const handleMovieSearch = (event) => {
    event.preventDefault();
    if (inputRef.current.value === "") return;
    setIsLoading(true);
    facade
      .searchMovie(inputRef.current.value)
      .then((res) => {
        setMovieData(res);
        inputRef.current.value = "";
      })
      .catch((err) => {
        //err.fullError.then(e => setErrorMsg(e.message))
        //navigate("/error")
      });
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <div class="nine">
          <h1>
            Search <span style={{ color: "white" }}>Look up a movie by its title</span>{" "}
          </h1>
        </div>
        <div className="search-bar">
          <form className="search-field-form">
            <div className="search-field">
              <input id="search" type="text" placeholder="Search..." ref={inputRef} required />
            </div>
            <button type="submit" onClick={handleMovieSearch}>
              <i className="fa fa-fw fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      {isLoading ? (
        <h1>Loading movie...</h1>
      ) : (
        movieData !== undefined && <Movie movieData={movieData} />
      )}
    </>
  );
}

export default Search;

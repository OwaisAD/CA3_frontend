import {BASE_API_URL as URL} from "../../settings"


const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  return await res.json();
}

function apiFacade() {

  const searchMovie = async (movieTitle) => {
    const options = makeOptions("GET"); //True add's the token to the headers doing a check if user is logged in and if the addToken parameter is true, which it is here
    return await fetch(URL + "/movie/"+movieTitle, options)
      .then(handleHttpErrors)
  }

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const setRole = (roles) => {
    localStorage.setItem("roles", roles)
  }

  const getRole = () => {
    return localStorage.getItem("roles")
  }

  const setUsername = (username) => {
    return localStorage.setItem("username", username)
  }

  const getUsername = () => {
    return localStorage.getItem("username")
  }

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
  };


  const login = async (username, password) => {
    const options = makeOptions("POST", true, {
      username: username,
      password: password,
    });

    return await fetch(URL + "/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token)
        setRole(res.roles)
        setUsername(res.username)
        window.localStorage.setItem("isLoggedIn", true)
      })
  };

  const createUser = async (username, password, age) => {
    const options = makeOptions("POST", false, {
      username: username,
      password: password,
      age: age
    });
    
    return await fetch(URL + "/users", options)
      .then(handleHttpErrors)

  }

  const fetchData = async () => {
    const options = makeOptions("GET",true); //True add's the token to the headers doing a check if user is logged in and if the addToken parameter is true, which it is here
    const role = getRole()

    // try getting for user
    if(role === "user") {
    return await fetch(URL + "/users/me", options)
      .then(handleHttpErrors)
    }

    // then try getting for admin
    if(role === "admin") {
      return await fetch(URL + "/info/admin", options)
        .then(handleHttpErrors)
    }
  };

  // add movie to user
  const addMovieToUser = async (movietitle, year) => {
    const options = makeOptions("POST", true, {
      title: movietitle,
      year: year,
    })
    return await fetch(`${URL}/users/me/movies`, options)
      .then(handleHttpErrors)
  }

  const removeMovieFromUser = async (movieId) => {
    const options = makeOptions("DELETE", true)
    return await fetch(`${URL}/users/me/movies/${movieId}`, options)
      .then(handleHttpErrors)
  }

  const getUserMovies = async () => {
      const options = makeOptions("GET", true)

      return await fetch(`${URL}/users/me/movies`, options)
        .then(handleHttpErrors)
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
      console.log(opts.body);
    }
    return opts;
  };


  return {
    searchMovie,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUsername,
    createUser,
    addMovieToUser,
    removeMovieFromUser,
    getUserMovies,
  };
}
const facade = apiFacade();
export default facade;

import {BASE_API_URL as URL} from "../../settings"
import { DAWA_URL } from "../../settings";
import { DAWA_URL_REVERSE } from "../../settings";

const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  return await res.json();
}

function apiFacade() {


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

  const createUser = async (username, email, password, age) => {
    const options = makeOptions("POST", false, {
      username,
      email,
      password,
      age,
    });
    
    return await fetch(URL + "/users", options)
      .then(handleHttpErrors)
  }

  const updateUser = async (userObject) => {
    const options = makeOptions("PUT", true, userObject)

    return await fetch(URL + "/users/me/update", options)
      .then(handleHttpErrors)
  }


  const fetchData = async () => {
    const options = makeOptions("GET",true);

    return await fetch(URL + "/users/me", options)
      .then(handleHttpErrors)
    
  };

  //get user trips
  const getUserTrips = async () => {
    const options = makeOptions("GET", true)

    return await fetch(URL + "/users/me/trips", options)
      .then(handleHttpErrors)
  }

  //get user trip
  const getUserTrip = async (id) => {
    const options = makeOptions("GET", true)

    return await fetch(URL + `/trips/${id}`, options)
      .then(handleHttpErrors)
  }

  const acceptTrip = async (id) => {
    const options = makeOptions("PUT", true)

    return await fetch(URL + `/trips/${id}/proposal/accept`,options)
    .then(handleHttpErrors)
  }

  //delete user trip
  const deleteUserTrip = async (id) => {
    const options = makeOptions("DELETE", true)

    return await fetch(URL + `/trips/${id}`, options)
  }

  //FETCH DAWA ADDRESSES BY ADDRESS STRING
  const fetchAddresses = async (address) => {
    const options = makeOptions("GET", false)

    return await fetch(DAWA_URL + address, options)
      .then(handleHttpErrors)
  }

  //FETCH DAWA ADDRESSES BY X- AND Y- COORDINATES
  const fetchAddressesByXandY = async (x, y) => {
    const options = makeOptions("GET", false)

    return await fetch(DAWA_URL_REVERSE + `x=${x}&y=${y}&struktur=mini`, options)
      .then(handleHttpErrors)
  }

  const createTrip = async (tripObject) => {
    const options = makeOptions("POST", true, tripObject)

    return await fetch(URL + "/trips/", options)
      .then(handleHttpErrors)
  }

  const editTrip = async (tripId, tripObject) => {
    const options = makeOptions("PUT", true, tripObject)

    return await fetch(URL + `/trips/${tripId}`, options)
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
    }
    return opts;
  };


  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    setUsername,
    getUsername,
    createUser,
    updateUser,
    fetchAddresses,
    fetchAddressesByXandY,
    createTrip,
    getUserTrips,
    deleteUserTrip,
    getUserTrip,
    editTrip,
    acceptTrip,
  };
}
const facade = apiFacade();
export default facade;

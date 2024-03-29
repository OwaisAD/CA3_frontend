import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Status from "../components/Status";
import facade from "../facades/apiFacade";
import { Outlet } from "react-router-dom";

const Trips = () => {
  const navigate = useNavigate();

  const [myTrips, setMyTrips] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const statusColor = {
    "no matches": "rgb(137, 148, 137)",
    match: "rgb(252, 255, 82)",
    pending: "rgb(255,127,80)",
    accepted: "rgb(124,252,0)",
  };

  useEffect(() => {
    facade.getUserTrips().then((res) => setMyTrips(res))
      .catch(err => {
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            if(e.message === "Token not valid (timed out?)") {
              setErrorMsg("Please login again")
              setTimeout(() => {
                facade.logout()
                navigate("/login")
              }, 4000)
            }
          });
        } else {
          setErrorMsg("Network error");
        }
      });
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="trips-page">
        <div className="trips-container">
          <h1>Your Trips</h1>
          <div className="refresh-btn">
            <p onClick={handleRefresh} style={{ cursor: "pointer" }}>
              <i className="fas fa-refresh" style={{ zIndex: "1000" }}></i>
            </p>
          </div>
          <div className="trips-list">
            {myTrips.length >= 1 &&
              myTrips
                ?.sort((tripA, tripB) => {
                  var key1 = tripA.date;
                  var key2 = tripB.date;

                  if (key1 < key2) {
                    return -1;
                  } else if (key1 == key2) {
                    return 0;
                  } else {
                    return 1;
                  }
                })
                .map((trip) => {
                  return (
                    <div
                      key={trip?.id}
                      style={{ padding: "3px" }}
                      className="trip-date-with-status"
                    >
                      <Link
                        className="trip-links"
                        to={`${trip?.id}`}
                        key={trip?.id}
                      >
                        {days[new Date(trip?.date).getDay()]} {trip?.date}
                      </Link>
                      <Status color={statusColor[trip?.status]} />
                      {console.log(statusColor[trip?.status])}
                    </div>
                  );
                })}
            {myTrips.length === 0 && <p>You currently have no trips</p>}
            {errorMsg !== "" && <h2 style={{color: "red"}}>{errorMsg}</h2>}
          </div>

          <div className="text-center mt-4">
            <Button onClick={() => navigate("/createtrip")}>Create Trip</Button>
          </div>

          <div className="status-container">
            <div>
              <Status color="rgb(124,252,0)" noStyle /> Both parties accepted
            </div>
            <div>
              <Status color="rgb(255,127,80)" noStyle /> Pending. Waiting for other user
              to accept
            </div>
            <div>
              <Status color="rgb(252, 255, 82)" noStyle /> Match has been found
            </div>
            <div>
              <Status color="rgb(137, 148, 137)" noStyle /> No match found yet
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-trips"></div>
      <Outlet />
    </>
  );
};

export default Trips;

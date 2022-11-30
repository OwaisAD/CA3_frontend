import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Status from "../components/Status";
import facade from "../facades/apiFacade";

const Trips = () => {
  const navigate = useNavigate();

  const [myTrips, setMyTrips] = useState([]);

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  useEffect(() => {
    facade.getUserTrips().then((res) => setMyTrips(res));
  }, []);

  return (
    <>
      <div className="trips-page">
        <div className="trips-container">
          <h1>Your Trips</h1>
          <div className="trips-list">
            {myTrips.length >= 1 &&
              myTrips?.map((trip) => {
                return (
                  <div key={trip?.id} style={{ padding: "3px" }}>
                    <Link
                      style={{ textDecoration: "none", width: "300px", fontSize: "18px" }}
                      to={`/trips/${trip?.id}`}
                      key={trip?.id}
                    >
                      {days[new Date(trip?.date).getDay()]} {trip?.date}
                    </Link>
                    <Status color="grey" />
                  </div>
                );
              })}
            {myTrips.length === 0 && <p>You currently have no trips</p>}
          </div>
          <div className="text-center">
            <Button onClick={() => navigate("/createtrip")}>
              Create Trip
            </Button>
          </div>
        </div>
      </div>
      <div className="overlay-trips"></div>
    </>
  );
};

export default Trips;

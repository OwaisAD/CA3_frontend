import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
  }

  useEffect(() => {
    facade.getUserTrips()
      .then(res => setMyTrips(res));
  }, []);

  return (
    <>
      <div className="trips-page">
        <div className="trips-container">
          <h1>My Trips</h1>
          {myTrips.length >= 1 && myTrips?.map((trip) => {
            return <div key={trip?.id}>{days[new Date(trip?.date).getDay()]} {trip?.date}</div>;
          })}
          {myTrips.length === 0 && <p>You currently have no trips</p>}
          <Button onClick={() => navigate("/createtrip")}>Create Trip</Button>
        </div>
      </div>
      <div className="overlay-trips"></div>
    </>
  );
};

export default Trips;

import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Trips = () => {
const navigate = useNavigate()

  return (
    <>
      <div className="trips-page">
        <div className="trips-container">
          <h1>My Trips</h1>
          <Button onClick={() => navigate("/createtrip")}>Create Trip</Button>
        </div>

      </div>
      <div className="overlay-trips"></div>
    </>
  );
};

export default Trips;

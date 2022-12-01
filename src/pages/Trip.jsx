import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const Trip = () => {
  const [trip, setTrip] = useState({});
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const fetchTripData = async () => {
    await facade.getUserTrip(params.id)
      .then((res) => setTrip(res))
      .catch((err) => {
        err.fullError.then((e) => setError(e.message))
      } );
  };

  useEffect(() => {
    fetchTripData();
  }, []);

  const handleDeleteTrip = async () => {
    let confirmed = confirm("Are you sure you want to delete this trip...?");
    if (confirmed) {
      await facade.deleteUserTrip(params.id);
      navigate("/trips");
    }
  };

  return (
    <>
      <div className="trip-page">
        <div className="trip-page-container">
          {error === "" ? 
          <><Button
            onClick={handleDeleteTrip}
            style={{ position: "absolute", top: "0", right: "0" }}
            variant="danger"
          >
            Delete trip <i className="fas fa-trash"></i>
          </Button>
          <h2>Date: {trip?.date}</h2>
          <p>From: {trip?.startpoint}</p>
          <p>To: {trip?.startpoint}</p>
          <p>Flexibility radius: {trip?.acceptance_radius}</p>
          <p>MAP</p>
          <Button>Edit trip</Button></> : <><h2>{error}</h2></>}
        </div>
      </div> 
      <div className="overlay-trip-page"></div>
    </>
  );
};

export default Trip;

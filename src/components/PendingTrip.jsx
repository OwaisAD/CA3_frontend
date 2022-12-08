import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import facade from "../facades/apiFacade";
import GoogleMap from "./GoogleMap";

const PendingTrip = ({
  tripId,
  error,
  days,
  trip,
  startpointFetched,
  endpointFetched,
  toX,
  toY,
  fromX,
  fromY,
}) => {
  const navigate = useNavigate();

  const handleDeleteTrip = async () => {
    let confirmed = confirm("Are you sure you want to delete this trip...?");
    if (confirmed) {
      await facade.deleteUserTrip(tripId);
      navigate("/trips");
    }
  };

  return (
    <div
      className="trip-page-container"
      style={{ borderLeft: "10px solid orange" }}
    >
      {error === "" ? (
        <>
          <Button
            className="delete-trip"
            onClick={handleDeleteTrip}
            variant="danger"
          >
            Delete trip <i className="fas fa-trash"></i>
          </Button>
          <h1>Pending. Waiting for others to accept.</h1>
          <h1>Match found!</h1>
          <h2>
            Travel date: {days[new Date(trip?.date).getDay()]} {trip?.date}
          </h2>
          <p>From: {startpointFetched}</p>
          <p>To: {endpointFetched}</p>
          <p>Flexibility radius: {trip?.acceptance_radius}</p>
          {fromX !== "" && fromY !== "" && toX !== "" && toY !== "" && (
            <GoogleMap fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
          )}
        </>
      ) : (
        <>
          <h2>{error}</h2>
        </>
      )}
    </div>
  );
};

export default PendingTrip;

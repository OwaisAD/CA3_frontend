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
    <div className="trip-page-container" style={{ borderLeft: "10px solid rgb(255,127,80)" }}>
      {error === "" ? (
        <>
          <p className="delete-trip-icon" onClick={handleDeleteTrip}>
            <i className="fas fa-trash"></i>
          </p>
          <h1 className="text-center">Waiting for {trip?.proposals[0].username} to accept.</h1>
          <h3 className="text-center mt-3 mb-4">
            {days[new Date(trip?.date).getDay()]} {trip?.date}
          </h3>
          <p><span className="styling-from-to-flex-span">From: </span> {startpointFetched}</p>
          <p><span className="styling-from-to-flex-span">To: </span> {endpointFetched}</p>
          <p><span className="styling-from-to-flex-span">Flex radius: </span> {trip?.acceptance_radius} {trip?.acceptance_radius == 1 ? "km" : "kms"}</p>
          {fromX !== "" && fromY !== "" && toX !== "" && toY !== "" && (
            <div className="text-center">
              <GoogleMap fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
            </div>
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

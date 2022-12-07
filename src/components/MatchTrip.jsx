import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import facade from "../facades/apiFacade";
import GoogleMap from "./GoogleMap";

const MatchTrip = ({
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

  const handleAcceptTrip = async () => {
    let confirmed = confirm("Are you sure you want to accept the trip?");
    if (confirmed) {
      await facade.acceptTrip(tripId);
      navigate("/trips");
    }
  };

  return (
    <div
      className="trip-page-container"
      style={{ borderLeft: "10px solid yellow" }}
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
          <h2>
            Travel date: {days[new Date(trip?.date).getDay()]} {trip?.date}
          </h2>
          <p>From: {startpointFetched}</p>
          <p>To: {endpointFetched}</p>
          <p>Flexibility radius: {trip?.acceptance_radius}</p>
          {fromX !== "" && fromY !== "" && toX !== "" && toY !== "" && (
            <GoogleMap fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
          )}
          <div>
            <h4>
              These are the following matches you have, select a proposal:
            </h4>
            <select>
              {trip?.proposals.map((proposal) => {
                return (
                  <option value={proposal?.id} key={proposal?.id}>
                    {proposal?.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <Button variant="primary" onClick={handleAcceptTrip}>
              Accept
            </Button>
            <Button variant="danger">Reject</Button>
          </div>
        </>
      ) : (
        <>
          <h2>{error}</h2>
        </>
      )}
    </div>
  );
};

export default MatchTrip;

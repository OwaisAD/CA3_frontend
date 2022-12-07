import React, { useState } from "react";
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

  const [proposalId, setProposalId] = useState(0);

  const handleProposalIdChange = (evt) => {
    setProposalId(evt.target.value);
  };

  const handleDeleteTrip = async () => {
    let confirmed = confirm("Are you sure you want to delete this trip...?");
    if (confirmed) {
      await facade.deleteUserTrip(tripId);
      navigate("/trips");
    }
  };

  const handleAcceptTrip = async () => {
    if (proposalId < 1) return;
    let confirmed = confirm(
      "Are you sure you want to accept with the proposal id " + proposalId + "?"
    );
    if (confirmed) {
      await facade.acceptTrip(tripId, proposalId);
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
          <div>
            <h4>These are the following matches you have:</h4>
            <select defaultValue={"-"} onChange={handleProposalIdChange}>
              <option value="-"> -- Select an option -- </option>
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

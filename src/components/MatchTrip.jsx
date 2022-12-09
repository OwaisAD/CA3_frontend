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
    let confirmed = confirm("Are you sure you want to accept proposal with id " + proposalId + "?");
    if (confirmed) {
      await facade.acceptTrip(tripId, proposalId);
      navigate("/trips");
    }
  };

  const handleRejectTrip = async () => {
    if (proposalId < 1) return;
    let confirmed = confirm("Are you sure you want to reject proposal with id " + proposalId + "?");
    if (confirmed) {
      await facade.rejectTrip(tripId, proposalId);
      navigate("/trips");
    }
  };

  const preferedTimeFaker = {
    0: "early",
    1: "mid-day",
    2: "afternoon",
  };

  return (
    <div className="trip-page-container" style={{ borderLeft: "10px solid yellow" }}>
      {error === "" ? (
        <>
          <p className="delete-trip-icon" onClick={handleDeleteTrip}>
            <i className="fas fa-trash"></i>
          </p>
          <h1 className="text-center">{trip?.proposals.length == 1 ? "Match found!" : "Matches found!"}</h1>
          <h4 className="text-center mb-4">
            {days[new Date(trip?.date).getDay()]} {trip?.date}
          </h4>
          <p>
            <span className="styling-from-to-flex-span">From: </span>
            {startpointFetched}
          </p>
          <p>
            <span className="styling-from-to-flex-span">To: </span>
            {endpointFetched}
          </p>
          <p>
            <span className="styling-from-to-flex-span">Flex radius:</span>{" "}
            {trip?.acceptance_radius} {trip?.acceptance_radius == 1 ? "km" : "kms"}
          </p>
          {fromX !== "" && fromY !== "" && toX !== "" && toY !== "" && (
            <div className="text-center">
              <GoogleMap fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
            </div>
          )}
          <div>
            <h5 className="text-center my-3">These are the following matches you have:</h5>
            <select defaultValue={"-"} onChange={handleProposalIdChange}>
              <option value="-"> -- Select an option -- </option>
              {trip?.proposals.map((proposal) => {
                return (
                  <option value={proposal?.id} key={proposal?.id}>
                    Trip with {proposal?.username} (prefered time:{" "}
                    {preferedTimeFaker[Math.floor(Math.random() * 3)]})
                  </option>
                );
              })}
            </select>
          </div>
          <div className="text-center">
            <Button className="m-2" variant="primary" onClick={handleAcceptTrip}>
              Accept
            </Button>
            <Button className="m-2" variant="danger" onClick={handleRejectTrip}>
              Reject
            </Button>
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

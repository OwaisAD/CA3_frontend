import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";
import GoogleMap from "../components/GoogleMap";

const Trip = () => {
  const [trip, setTrip] = useState({});
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [fromX, setFromX] = useState("");
  const [fromY, setFromY] = useState("");
  const [toX, setToX] = useState("");
  const [toY, setToY] = useState("");

  const fetchTripData = async () => {
    await facade
      .getUserTrip(params.id)
      .then((res) => {
        setTrip(res);
      })
      .catch((err) => {
        err.fullError.then((e) => setError(e.message));
      });
  };

  useEffect(() => {
    fetchTripData();
    let from = trip?.startpoint;
    let to = trip?.endpoint;
    let fromArr = String(from).split(",");
    let toArr = String(to).split(",");
    setFromX(fromArr?.[1]);
    setFromY(fromArr?.[0]);
    setToX(toArr?.[1]);
    setToY(toArr?.[0]);
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
        <div className="trip-page-container" style={{ borderLeft: "8px solid grey" }}>
          {error === "" ? (
            <>
              <Button
                onClick={handleDeleteTrip}
                style={{ position: "absolute", top: "0", right: "0" }}
                variant="danger"
              >
                Delete trip <i className="fas fa-trash"></i>
              </Button>
              <h2>Date: {trip?.date}</h2>
              <p>From: {trip?.startpoint}</p>
              <p>To: {trip?.endpoint}</p>
              <p>Flexibility radius: {trip?.acceptance_radius}</p>
              <Button onClick={() => navigate(`/trips/${params.id}/edit`)}>Edit trip</Button>
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
      </div>
      <div className="overlay-trip-page"></div>
    </>
  );
};

export default Trip;

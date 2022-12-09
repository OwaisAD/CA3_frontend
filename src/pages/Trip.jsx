import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";
import GoogleMap from "../components/GoogleMap";
import EditTrip from "../components/EditTrip";
import MatchTrip from "../components/MatchTrip";
import AcceptedTrip from "../components/AcceptedTrip";
import PendingTrip from "../components/PendingTrip";

const Trip = () => {
  const [trip, setTrip] = useState({});
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [fromX, setFromX] = useState("");
  const [fromY, setFromY] = useState("");
  const [toX, setToX] = useState("");
  const [toY, setToY] = useState("");

  const [startpointFetched, setStartpointFetched] = useState("");
  const [endpointFetched, setEndpointFetched] = useState("");

  const [editingMode, setEditingMode] = useState(false);
  const [edited, setEdited] = useState(false);

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const fetchAddressesForNames = async (x, y) => {
    const res = await facade.fetchAddressesByXandY(x, y);
    return res.betegnelse;
  };

  useEffect(() => {
    facade
      .getUserTrip(params.id)
      .then((res) => {
        setTrip(res);
        let fromArr = String(res.startpoint).split(",");
        let toArr = String(res.endpoint).split(",");
        setFromX(fromArr?.[1]);
        setFromY(fromArr?.[0]);
        setToX(toArr?.[1]);
        setToY(toArr?.[0]);

        //fetching the from address based on x and y
        fetchAddressesForNames(res.startpoint.split(",")[1], res.startpoint.split(",")[0]).then(
          (res) => setStartpointFetched(res)
        );

        //fetching the to address based on x and y
        fetchAddressesForNames(res.endpoint.split(",")[1], res.endpoint.split(",")[0]).then((res) =>
          setEndpointFetched(res)
        );
      })
      .catch((err) => {
        err.fullError.then((e) => setError(e.message));
      });
  }, [edited]);

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
        {trip?.status === "no matches" && (
          <>
            {!editingMode && (
              <div className="trip-page-container" style={{ borderLeft: "10px solid rgb(137, 148, 137)"}}>
                {error === "" ? (
                  <>
                    <p className="delete-trip-icon" onClick={handleDeleteTrip}>
                      <i className="fas fa-trash"></i>
                    </p>
                    <h1 className="text-center">Looking for matches..</h1>
                    <h3 className="text-center mt-3 mb-4">
                      {days[new Date(trip?.date).getDay()]} {trip?.date}
                    </h3>
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
                      <div className="text-center my-2">
                        <GoogleMap fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
                      </div>
                    )}
                    <div className="text-center">
                      <Button onClick={() => setEditingMode(true)}>Edit trip</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>{error}</h2>
                  </>
                )}
              </div>
            )}

            {editingMode && (
              <EditTrip
                setEditingMode={setEditingMode}
                tripId={params.id}
                date={trip?.date}
                startPoint={startpointFetched}
                startPointCoordinates={{ fromX, fromY }}
                endPoint={endpointFetched}
                endPointCoordinates={{ toX, toY }}
                flexibility={trip?.acceptance_radius}
                setEdited={setEdited}
                edited={edited}
              />
            )}
          </>
        )}

        {trip?.status === "match" && (
          <>
            <MatchTrip
              tripId={params.id}
              error={error}
              days={days}
              trip={trip}
              startpointFetched={startpointFetched}
              endpointFetched={endpointFetched}
              toX={toX}
              toY={toY}
              fromX={fromX}
              fromY={fromY}
            />
          </>
        )}

        {trip?.status === "pending" && (
          <>
            <PendingTrip
              tripId={params.id}
              error={error}
              days={days}
              trip={trip}
              startpointFetched={startpointFetched}
              endpointFetched={endpointFetched}
              toX={toX}
              toY={toY}
              fromX={fromX}
              fromY={fromY}
            />
          </>
        )}

        {trip?.status === "accepted" && (
          <>
            <AcceptedTrip
              tripId={params.id}
              error={error}
              days={days}
              trip={trip}
              startpointFetched={startpointFetched}
              endpointFetched={endpointFetched}
              toX={toX}
              toY={toY}
              fromX={fromX}
              fromY={fromY}
            />
          </>
        )}
      </div>
      <div className="overlay-trip-page"></div>
    </>
  );
};

export default Trip;

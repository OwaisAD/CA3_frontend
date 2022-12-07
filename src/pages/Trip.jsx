import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";
import GoogleMap from "../components/GoogleMap";
import EditTrip from "../components/EditTrip";
import MatchTrip from "../components/MatchTrip";

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
        fetchAddressesForNames(
          res.startpoint.split(",")[1],
          res.startpoint.split(",")[0]
        ).then((res) => setStartpointFetched(res));

        //fetching the to address based on x and y
        fetchAddressesForNames(
          res.endpoint.split(",")[1],
          res.endpoint.split(",")[0]
        ).then((res) => setEndpointFetched(res));
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
              <div
                className="trip-page-container"
                style={{ borderLeft: "10px solid grey" }}
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
                      Travel date: {days[new Date(trip?.date).getDay()]}{" "}
                      {trip?.date}
                    </h2>
                    <p>From: {startpointFetched}</p>
                    <p>To: {endpointFetched}</p>
                    <p>Flexibility radius: {trip?.acceptance_radius}</p>
                    <Button onClick={() => setEditingMode(true)}>
                      Edit trip
                    </Button>
                    {fromX !== "" &&
                      fromY !== "" &&
                      toX !== "" &&
                      toY !== "" && (
                        <GoogleMap
                          fromX={fromX}
                          fromY={fromY}
                          toX={toX}
                          toY={toY}
                        />
                      )}
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
      </div>
      <div className="overlay-trip-page"></div>
    </>
  );
};

export default Trip;

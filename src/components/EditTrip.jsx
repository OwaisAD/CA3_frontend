import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import facade from "../facades/apiFacade";
import { isValidDate } from "../components/utils/DateValidator";
import { useNavigate } from "react-router-dom";
import GoogleMap from "./GoogleMap";

const EditTrip = ({
  setEditingMode,
  setEdited,
  edited,
  tripId,
  date,
  startPoint,
  startPointCoordinates,
  endPoint,
  endPointCoordinates,
  flexibility,
}) => {
  const navigate = useNavigate();

  const [currFromAddress, setCurrFromAddress] = useState(startPoint);
  const [currFromAddresses, setCurrFromAddresses] = useState([]);

  const [currToAddress, setCurrToAddress] = useState(endPoint);
  const [currToAddresses, setCurrToAddresses] = useState([]);

  const [flexibilityRadius, setFlexibilityRadius] = useState(flexibility);

  const [travelDate, setTravelDate] = useState(date);

  const [errorMsg, setErrorMsg] = useState("");

  // saving and updating the data for the from-location
  const onChangeFrom = async (evt) => {
    setCurrFromAddress(evt.target.value);
    const addresses = await facade.fetchAddresses(evt.target.value);
    setCurrFromAddresses(addresses);
  };

  // saving and updating the data for the to-location
  const onChangeTo = async (evt) => {
    setCurrToAddress(evt.target.value);
    const addresses = await facade.fetchAddresses(evt.target.value);
    setCurrToAddresses(addresses);
  };

  const handleAddressFromClicked = async (addressClicked) => {
    setCurrFromAddress(addressClicked);
    const addresses = await facade.fetchAddresses(addressClicked);
    setCurrFromAddresses(addresses);
  };

  const handleAddressToClicked = async (addressClicked) => {
    setCurrToAddress(addressClicked);
    const addresses = await facade.fetchAddresses(addressClicked);
    setCurrToAddresses(addresses);
  };

  const handleFlexibilityRadius = (evt) => {
    setFlexibilityRadius(evt.target.value);
  };

  const handleTravelDate = (evt) => {
    setTravelDate(evt.target.value);
  };

  // handling submit
  const handleEditTrip = async () => {
    if (
      currFromAddress == startPoint &&
      currToAddress == endPoint &&
      flexibilityRadius == flexibility &&
      travelDate == date
    ) {
      setErrorMsg("No information changed");
      return;
    }

    if (currFromAddress !== startPoint && currFromAddresses.length < 1) {
      setErrorMsg("Please enter a from destination");
      return;
    }
    if (currToAddress !== endPoint && currToAddresses.length < 1) {
      setErrorMsg("Please enter a to destination");
      return;
    }
    if (flexibilityRadius === 0) {
      setErrorMsg("Please select a flexibility radius");
      return;
    }
    if (travelDate === "") {
      setErrorMsg("Please select a travel date");
      return;
    }
    if (!isValidDate(travelDate)) {
      setErrorMsg("Please select a valid travel date");
      return;
    }

    console.log("FROM", currFromAddresses);
    console.log("TO", currToAddresses);
    console.log(endPointCoordinates);

    const fromCoordinates =
      currFromAddress == startPoint
        ? `${startPointCoordinates.fromY},${startPointCoordinates.fromX}`
        : `${currFromAddresses[0].data.y},${currFromAddresses[0].data.x}`;
    const toCoordinates =
      currToAddress == endPoint
        ? `${endPointCoordinates.toY},${endPointCoordinates.toX}`
        : `${currToAddresses[0].data.y},${currToAddresses[0].data.x}`;

    console.log(fromCoordinates);
    console.log(toCoordinates);

    const tripObject = {
      startpoint: fromCoordinates,
      endpoint: toCoordinates,
      acceptance_radius: flexibilityRadius,
      date: travelDate,
    };
    await facade.editTrip(tripId, tripObject).then(() => {
      setErrorMsg("");
      setEdited(!edited);
      setEditingMode(false);
    });
  };

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return (
    <div className="editing-mode-container">
      <h2>Editing trip</h2>
      <h3>
        {days[new Date(date).getDay()]} {date}
      </h3>
      <label htmlFor="">
        Change where you're travelling from:
        <div className="autocomplete">
          <input
            id="fromInput"
            type="text"
            name="fromAddress"
            placeholder="Start location"
            onChange={onChangeFrom}
            value={currFromAddress}
          />
          <div className="autocomplete-items">
            {currFromAddresses.length > 1 &&
              currFromAddresses
                .map((address, idx) => {
                  return (
                    <div key={idx} onClick={() => handleAddressFromClicked(address.forslagstekst)}>
                      <p>{address.forslagstekst}</p>
                    </div>
                  );
                })
                .slice(0, 10)}
          </div>
        </div>
      </label>

      <label htmlFor="">
        Change where you're travelling to:
        <div className="autocomplete">
          <input
            id="toInput"
            type="text"
            name="toAddress"
            placeholder="End location"
            onChange={onChangeTo}
            value={currToAddress}
          />
          <div className="autocomplete-items">
            {currToAddresses.length > 1 &&
              currToAddresses
                .map((address, idx) => {
                  return (
                    <div key={idx} onClick={() => handleAddressToClicked(address.forslagstekst)}>
                      <p>{address.forslagstekst}</p>
                    </div>
                  );
                })
                .slice(0, 10)}
          </div>
        </div>
      </label>

      <label htmlFor="">
        Change how far from your start and end locations you can do a drive-by:
        <Form.Select defaultValue={flexibilityRadius} onChange={handleFlexibilityRadius}>
          <option value=""> -- Select an option -- </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Select>
      </label>

      <label htmlFor="">
        Change travel date
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={handleTravelDate}
          value={travelDate}
        />
      </label>

      <div>
        <Button variant="secondary" onClick={() => setEditingMode(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditTrip}>
          Save
        </Button>

        {currFromAddresses.length === 1 && currToAddresses.length === 1 && (
          <>
            <h4>New route:</h4>
            <GoogleMap
              fromY={currFromAddresses[0].data.y}
              fromX={currFromAddresses[0].data.x}
              toY={currToAddresses[0].data.y}
              toX={currToAddresses[0].data.x}
            />
          </>
        )}

        <h3 style={{ color: "red" }}>{errorMsg}</h3>
      </div>
    </div>
  );
};

export default EditTrip;

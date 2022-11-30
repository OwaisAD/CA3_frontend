import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import facade from "../facades/apiFacade";

const CreateTrip = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  const [currFromAddress, setCurrFromAddress] = useState([]);
  const [currFromAddresses, setCurrFromAddresses] = useState([]);

  const [currToAddress, setCurrToAddress] = useState([]);
  const [currToAddresses, setCurrToAddresses] = useState([]);

  const [flexibilityRadius, setFlexibilityRadius] = useState(0);

  const [travelDate, setTravelDate] = useState("");

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  const today = `${year}-${month}-${day}`;

  // saving and updating the data for the to-location
  const onChangeFrom = async (evt) => {
    setCurrFromAddress(evt.target.value);
    const addresses = await facade.fetchAddresses(evt.target.value);
    setCurrFromAddresses(addresses);
  };

  const handleAddressFromClicked = async (addressClicked) => {
    setCurrFromAddress(addressClicked);
    const addresses = await facade.fetchAddresses(addressClicked);
    setCurrFromAddresses(addresses);
  };

  // saving and updating the data for the to-location
  const onChangeTo = async (evt) => {
    setCurrToAddress(evt.target.value);
    const addresses = await facade.fetchAddresses(evt.target.value);
    setCurrToAddresses(addresses);
  };

  const handleAddressToClicked = async (addressClicked) => {
    setCurrToAddress(addressClicked);
    const addresses = await facade.fetchAddresses(addressClicked);
    setCurrToAddresses(addresses);
  };

  const handleFlexibilityRadius = (evt) => {
    setFlexibilityRadius(evt.target.value);
    console.log(flexibilityRadius);
  };

  const handleTravelDate = (evt) => {
    setTravelDate(evt.target.value);
  };

  // handling submit
  const handleCreateTrip = async () => {
    if (currFromAddresses.length < 1) {
      setErrorMsg("Please enter a from destination");
      return;
    }
    if (currToAddresses.length < 1) {
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

    // console.log("FROM",currFromAddresses);
    // console.log("TO",currToAddresses);
    const fromCoordinates = `${currFromAddresses[0].data.x},${currFromAddresses[0].data.y}`;
    const toCoordinates = `${currToAddresses[0].data.x},${currToAddresses[0].data.y}`;
    const tripObject = {
      startpoint: fromCoordinates,
      endpoint: toCoordinates,
      acceptance_radius: flexibilityRadius,
      date: travelDate,
    };
    await facade.createTrip(tripObject).then(() => {
      setErrorMsg("");
    });
    navigate("/mytrips")
  };

  return (
    <div className="create-trip-page">
      <div className="create-trip-component">
        <label htmlFor="">From</label>
        <div className="autocomplete">
          <input
            style={{ width: "500px" }}
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

        <label htmlFor="">To</label>
        <div className="autocomplete">
          <input
            style={{ width: "500px" }}
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

        <label htmlFor="">Flexibility radius</label>
        <Form.Select onChange={handleFlexibilityRadius}>
          <option value=""> -- Select an option -- </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Select>

        <label htmlFor="">Travel date</label>
        <input type="date" min={today} onChange={handleTravelDate} />

        <Button variant="primary" onClick={handleCreateTrip}>
          Save
        </Button>
        <Button variant="danger" onClick={() => navigate("/mytrips")}>
          Cancel
        </Button>
        <h3 style={{ color: "red" }}>{errorMsg}</h3>
      </div>
      <div className="overlay-create-trips"></div>
    </div>
  );
};

export default CreateTrip;

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import facade from "../facades/apiFacade";

const EditTrip = ({ setEditingMode, tripId, date, startPoint, endPoint, flexibility }) => {
  const [currFromAddress, setCurrFromAddress] = useState(startPoint);
  const [currFromAddresses, setCurrFromAddresses] = useState([]);

  const [currToAddress, setCurrToAddress] = useState(endPoint);
  const [currToAddresses, setCurrToAddresses] = useState([]);

  const [flexibilityRadius, setFlexibilityRadius] = useState(flexibility);

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
  
  const handleFlexibilityRadius = (evt) => {
    setFlexibilityRadius(evt.target.value);
  };

  const handleAddressToClicked = async (addressClicked) => {
    setCurrToAddress(addressClicked);
    const addresses = await facade.fetchAddresses(addressClicked);
    setCurrToAddresses(addresses);
  };

  const handleTravelDate = (evt) => {
    setTravelDate(evt.target.value);
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
      <h3>{days[new Date(date).getDay()]} {date}</h3>
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
        <Form.Select defaultValue={flexibilityRadius} onChange={handleFlexibilityRadius} >
          <option value=""> -- Select an option -- </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Select>

        <label htmlFor="">Travel date</label>
        <input type="date" min={new Date().toISOString().split('T')[0]} onChange={handleTravelDate} value={date} />

      <div>
        <Button variant="secondary" onClick={() => setEditingMode(false)}>
          Cancel
        </Button>
        <Button variant="primary">Save</Button>
      </div>
    </div>
  );
};

export default EditTrip;

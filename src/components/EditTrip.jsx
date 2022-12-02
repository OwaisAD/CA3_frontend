import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const EditTrip = ({ setEditingMode, tripId, startPoint, endPoint}) => {
  const [currFromAddress, setCurrFromAddress] = useState(startPoint);
  const [currFromAddresses, setCurrFromAddresses] = useState([]);

  const [currToAddress, setCurrToAddress] = useState(endPoint);
  const [currToAddresses, setCurrToAddresses] = useState([]);

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

  return (
    <div className="editing-mode-container">
      <h2>Editing trip</h2>
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


      <Button variant="secondary" onClick={() => setEditingMode(false)}>
        Cancel
      </Button>
      <Button variant="primary">Save</Button>
    </div>
  );
};

export default EditTrip;

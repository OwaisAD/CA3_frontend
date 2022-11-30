import React from "react";
import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import facade from "../facades/apiFacade";

const CreateTrip = () => {
    const fromRef = useRef();
    const fromRefClicked = useRef();

    const [currFromAddress, setCurrFromAddress] = useState([])
    const [currFromAddresses, setCurrFromAddresses] = useState([])

    const onChange = async (evt) => {
        setCurrFromAddress(evt.target.value)
        const addresses = await facade.fetchAddresses(evt.target.value);
        setCurrFromAddresses(addresses)
    }


  const handleAddressClicked = async (addressClicked) => {
        setCurrFromAddress(addressClicked)
        const addresses = await facade.fetchAddresses(addressClicked);
        setCurrFromAddresses(addresses)
  }

  return (
    <div className="create-trip-page">
      <div className="create-trip-component">

        <label htmlFor="">From</label>
        <div className="autocomplete">
          <input style={{width: "500px"}} id="fromInput" type="text" name="fromAddress" placeholder="Start position" onChange={onChange} value={currFromAddress}/>
          <div className="autocomplete-items">
            {currFromAddresses.length > 1 && currFromAddresses.map((address, idx) => {
                return <div key={idx} onClick={() => handleAddressClicked(address.forslagstekst)}><p ref={fromRefClicked}>{address.forslagstekst}</p></div>
            })}
          </div>
        </div>


        <label htmlFor="">To</label>
        <input type="search" />

        <label htmlFor="">Flexibility radius</label>
        <Form.Select>
          <option>1</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </Form.Select>

        <Button variant="primary">Save</Button>
        <Button variant="danger">Cancel</Button>
      </div>
      <div className="overlay-create-trips"></div>
    </div>
  );
};

export default CreateTrip;

import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";
import { isValidDate } from "../components/utils/DateValidator";
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

  // saving and updating the data for the from-location
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
  };

  const handleTravelDate = (evt) => {
    setTravelDate(evt.target.value);
  };

  // handling submit
  const handleCreateTrip = async () => {
    if (currFromAddresses.length < 1) {
      setErrorMsg("Please enter a from location");
      return;
    }
    if (currToAddresses.length < 1) {
      setErrorMsg("Please enter a to location");
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

    // console.log("FROM",currFromAddresses);
    // console.log("TO",currToAddresses);
    const fromCoordinates = `${currFromAddresses[0].data.y},${currFromAddresses[0].data.x}`;
    const toCoordinates = `${currToAddresses[0].data.y},${currToAddresses[0].data.x}`;
    const tripObject = {
      startpoint: fromCoordinates,
      endpoint: toCoordinates,
      acceptance_radius: flexibilityRadius,
      date: travelDate,
    };
    await facade
      .createTrip(tripObject)
      .then(() => {
        setErrorMsg("");
        navigate("/trips");
      })
      .catch((err) => {
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            if(e.message === "Token not valid (timed out?)") {
              setErrorMsg("Please login again")
              setTimeout(facade.logout, 4000)
              navigate("/")
            }
            //setErrorMsg(e.message);
          });
        } else {
          setErrorMsg("Network error");
        }
      });
  };

  return (
    <div className="create-trip-page">
      <div className="create-trip-component">
        <h2>Create trip</h2>
        <label htmlFor="">
          Where do you want to travel from?
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
                      <div
                        key={idx}
                        onClick={() => handleAddressFromClicked(address.forslagstekst)}
                      >
                        <p>{address.forslagstekst}</p>
                      </div>
                    );
                  })
                  .slice(0, 10)}
            </div>
          </div>
        </label>

        <label htmlFor="">
          Where do you want to travel to?
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
          How far from your start and end locations you can do a drive-by?
          <Form.Select onChange={handleFlexibilityRadius}>
            <option value="">Select an option (kms)</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Select>
        </label>

        <label htmlFor="">
          Travel date
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={handleTravelDate}
          />
        </label>

        {currFromAddresses.length === 1 && currToAddresses.length === 1 && (
          <div style={{ textAlign: "center" }}>
            <h4>Route</h4>
            <GoogleMap
              fromY={currFromAddresses[0].data.y}
              fromX={currFromAddresses[0].data.x}
              toY={currToAddresses[0].data.y}
              toX={currToAddresses[0].data.x}
            />
          </div>
        )}

        <div className="text-center pt-3">
          <Button className="m-1" variant="primary" onClick={handleCreateTrip}>
            Save
          </Button>
          <Button className="m-1" variant="danger" onClick={() => navigate("/trips")}>
            Cancel
          </Button>
        </div>
        <h3 style={{ color: "red", textAlign: "center" }}>{errorMsg}</h3>
      </div>
      <div className="overlay-create-trips"></div>
    </div>
  );
};

export default CreateTrip;

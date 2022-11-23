import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Person = (props) => {
  let { personId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ width: "400px", height: "200px", border: "1px solid black" }}>
      Hallo person with id: {personId} <br />
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default Person;

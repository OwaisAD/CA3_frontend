import React from "react";

const Error = ({ errorMsg }) => {
  return (
    <div>
      <h3>Error</h3>
      <h2>{errorMsg}</h2>
    </div>
  );
};

export default Error;

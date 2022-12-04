import React from "react";

const Status = ({color, noStyle}) => {

  return noStyle ? <span className="dot2" style={{backgroundColor: color}}></span> : <span className="dot" style={{backgroundColor: color}}></span>;
};

export default Status;

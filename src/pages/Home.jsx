import React from "react";
import { Link, Outlet } from "react-router-dom";
import Image from "../images/ecodrive-logo.png";

function Home() {
  return (
    <>
      <div className="home-header">
        <div className="content">
          <img
            src={Image}
            alt="cinewatch logo"
            style={{ maxWidth: "180px", margin: "30px auto 20px", display: "block" }}
            className="logo"
          />
          <h1>Welcome to EcoDriver</h1>
        </div>
        <Outlet />
      </div>
      <div className="overlay"></div>
      </>
  );
}

export default Home;

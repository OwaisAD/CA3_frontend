import React from "react";
import { Link, Outlet } from "react-router-dom";
import Image from "../images/ecodrive-logo.png";

function Home() {
  return (
    <div>
      <div className="home-header">
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <div className="content">
          <img
            src={Image}
            alt="cinewatch logo"
            style={{ maxWidth: "180px", margin: "30px auto 20px", display: "block" }}
            className="logo"
          />
          <h1>Welcome to EcoDriver</h1>
          <div className="homepage-links">
            <div className="tag">
              <Link to="/about">Read more about us here!</Link>
            </div>
            <div className="tag">
              <Link to="/login">Already have a user?</Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ columns: "2", maxWidth: "900px", margin: "auto" }}>
        <section className="homepage-section">
          <h2>Get started</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam iste dolor suscipit
            unde eligendi, similique ab enim. Ex velit vero voluptate aperiam, doloribus non est
            ratione cum nesciunt quasi, itaque placeat animi culpa voluptatum. Impedit ducimus
            deserunt accusantium corporis, beatae fugit soluta. Nisi, veniam fugit beatae dolor
            eaque perferendis accusantium?
          </p>
        </section>
        <section className="homepage-section">
          <h2>Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam iste dolor suscipit
            unde eligendi, similique ab enim. Ex velit vero voluptate aperiam, doloribus non est
            ratione cum nesciunt quasi, itaque placeat animi culpa voluptatum. Impedit ducimus
            deserunt accusantium corporis, beatae fugit soluta. Nisi, veniam fugit beatae dolor
            eaque perferendis accusantium?
          </p>
        </section>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;

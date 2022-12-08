import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function About() {
  return (
    <>
      <div className="about-page">
        <div className="nine">
          <h1>
            About Us <span style={{ color: "white" }}>Est. 2022</span>{" "}
          </h1>
        </div>

        <div className="about-container">
          <div className="about-left">
            <p>We will answer ASAP on</p>
            <p>
              <FaEnvelope size={20}/>
              <a href="mailto:support@ecodrivr.dk" style={{ textDecoration: "none" }}>
                support@ecodrivr.dk
              </a>
            </p>
            <hr />
            <p>Call us on</p>
            <p>
              <FaPhoneAlt size={20} /> <a href="tel:+45 00 00 00 00" style={{ textDecoration: "none" }}>+45 00 00 00 00</a>
            </p>
            <hr />
            <p>Opening Hours</p>
            <p>Monday-Friday</p>
            <p>10:00-12:00, 13-00-18:00</p>
          </div>

          <div className="about-right">
            <h3>The Team</h3>
            <div>
              <img src="" alt="" />
              <p>Andreas</p>
            </div>

            <div>
              <img src="" alt="" />
              <p>Daniel</p>
            </div>

            <div>
              <img src="" alt="" />
              <p>Owais</p>
            </div>

            <div>
              <img src="" alt="" />
              <p>Thomas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-about"></div>
    </>
  );
}

export default About;

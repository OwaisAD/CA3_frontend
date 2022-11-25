import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-header">
        <div className="content">
          <h1>Share a car and care for our planet</h1>
        </div>
        <Outlet />
      </div>
      <div className="overlay"></div>
      </>
  );
}

export default Home;

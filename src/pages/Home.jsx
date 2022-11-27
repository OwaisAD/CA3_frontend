import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-header">
        <div className="content">
          <h1>Share A(nd) Car(e) <br /> for our planet</h1>
        </div>
        <Outlet />
      </div>
      <div className="overlay"></div>
      </>
  );
}

export default Home;

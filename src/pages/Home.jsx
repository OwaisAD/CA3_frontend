import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-header">
        <div className="content text-center">
          <span className="home-slogan">Share A<p className="inline-home">nd</p> Car<span className="inline-home">e</span><br /> for our planet</span>
        </div>
        <Outlet />
      </div>
      <div className="overlay"></div>
      </>
  );
}

export default Home;

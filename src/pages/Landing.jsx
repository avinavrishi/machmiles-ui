import React from "react";
import SearchBox from "../components/SearchBox";
// import './Landing.css'; // Import your custom CSS file for Landing component styles

const Landing = () => {
  return (
    <div className="landing">
      <div className="title">
        <p id="title-style">Find your Perfect Flight with Ease</p>
        <p id="subtitle">
          Discover Affordable Flights and Unforgettable Journeys
        </p>
      </div>
        <SearchBox/>
    </div>
  );
};

export default Landing;

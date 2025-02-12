import React, { useEffect, useState } from "react";

function Review() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    const flightData = localStorage.getItem("selectedFlight");
    if (flightData) {
      setSelectedFlight(JSON.parse(flightData));
    }
  }, []);

  if (!selectedFlight) {
    return <h2>No flight selected. Please go back and choose a flight.</h2>;
  }

  console.log("SelectedFlight", selectedFlight)

  return (
    <div>
      <h1>Review Your Flight</h1>
      <p>Flight Name: {selectedFlight.carrier_code}</p>
      <p>Price: ${selectedFlight.price_inclusive}</p>
      <button>Confirm Booking</button>
    </div>
  );
}

export default Review;

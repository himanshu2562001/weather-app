import React from 'react';

function CurrentLocationButton({ onCurrentLocation }) {
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {//Purpose: The code checks if the Geolocation API is available in the user's browser. If navigator.geolocation is truthy, it means that the browser supports geolocation, and you can proceed to request the user's location.
      navigator.geolocation.getCurrentPosition(//getCurrentPosition(): This method is called on navigator.geolocation to retrieve the user's current position (latitude and longitude).
        // Parameters:
        // This method accepts up to three arguments:
        // Success Callback: A function that will be called if the location is successfully retrieved.
        // Error Callback: A function that will be called if there is an error in retrieving the location.
        (position) => {
          const { latitude, longitude } = position.coords;
          onCurrentLocation(latitude, longitude);
        },
        () => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button id="current-location-button" onClick={handleCurrentLocation}>
        Current Location
      </button>
    </div>
  );
}

export default CurrentLocationButton;

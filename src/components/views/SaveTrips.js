import React, { useState, useEffect } from "react";

export const SaveTrips = () => {
  const [savedTrips, setSavedTrips] = useState([]);

  const localDayUser = localStorage.getItem("day_user");
  const dayUserObject = JSON.parse(localDayUser);

  const handleDelete = (id) => {
    fetch(`http://localhost:8088/savedTrips/${id}`, {
      method: "DELETE",
    }).then(() => {
      setSavedTrips((prevSavedTrips) =>
        prevSavedTrips.filter((trip) => trip.id !== id)
      );
      alert("You deleted a trip!");
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8088/savedTrips?userId=${dayUserObject.id}`)
      .then((response) => response.json())
      .then((tripArray) => {
        const locationFetches = tripArray.map((savedTrip) =>
          fetch(`http://localhost:8088/locations/${savedTrip.locationId}`)
            .then((response) => response.json())
            .then((location) => ({
              id: savedTrip.id,
              name: location.name,
              address: location.address,
              description: location.description,
              drive: location.drive,
              image: location.image,
            }))
        );

        Promise.all(locationFetches).then((locations) => {
          setSavedTrips(locations);
        });
      });
  }, [dayUserObject.id]);

  return (
    <div>
      <h2>Saved Trips</h2>
      {savedTrips.length > 0 ? (
        <ul>
          {savedTrips.map((savedTrip) => (
            <li key={savedTrip.id} className="saved-trip">
              <h3>{savedTrip.name}</h3>
              <p>{savedTrip.address}</p>
              <p>{savedTrip.description}</p>
              <p>Estimated {savedTrip.drive} hour Drive Time</p>
              <img src={savedTrip.image} alt={savedTrip.name} className="location-image"/>
              <div><button onClick={() => handleDelete(savedTrip.id)}>
                Delete Trip
              </button></div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no saved trips.</p>
      )}
    </div>
  );
};

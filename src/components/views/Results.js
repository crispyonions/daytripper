import React, { useEffect, useState } from 'react';

export const SearchResults = ({ categories, driveTime }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8088/locations?category_like=${categories.join(',')}&drive=${driveTime}`;
      const response = await fetch(url);
      const data = await response.json();
      setLocations(data);
    };

    fetchData();
  }, [categories, driveTime]);

  return (
    <>
      <h1>Search Results</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <h2>{location.name}</h2>
            <p>{location.description}</p>
            <p>Category: {location.category}</p>
            <p>Address: {location.address}</p>
            <p>Drive time: {location.drive} hour(s)</p>
          </li>
        ))}
      </ul>
    </>
  );
};

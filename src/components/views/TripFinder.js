import React, { useState } from 'react';

export const TripFinder = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDriveTime, setSelectedDriveTime] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const saveTrip = (trip) => {
    const localDayUser = localStorage.getItem("day_user");
    const dayUserObject = JSON.parse(localDayUser);
  
    // Check if the trip is already saved for the user
    fetch(`http://localhost:8088/savedTrips?locationId=${trip.id}&userId=${dayUserObject.id}`)
      .then((response) => response.json())
      .then((existingTrips) => {
        if (existingTrips.length > 0) {
          alert("This trip is already saved!")
        } else {
          // Save the trip if it's not already saved
          const tripData = {
            locationId: trip.id,
            userId: dayUserObject.id,
          }
  
          fetch('http://localhost:8088/savedTrips', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
          })
            .then((response) => response.json())
            .then(() => {
              alert("Your trip has been saved!");
            })
        }
      })
  };
  

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== value)
      );
    }
  };

  const handleDriveTimeChange = (e) => {
    setSelectedDriveTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8088/locations')
      .then(response => response.json())
      .then(data => {
        const filteredResults = data.filter((location) => {
          return (
            selectedCategories.includes(location.category_id.toString()) &&
            location.drive <= parseFloat(selectedDriveTime)
          );
        });
        setSearchResults(filteredResults);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
		  <div> <h1>🏞 trip finder 🏞</h1>     
      <h4>find trips near</h4><select><option>Nashville, TN</option>
            <option disabled>More cities coming soon!</option>
          </select><p></p>
          {/* again redirect to fetchin from categories + map thru em*/}
			<label htmlFor="category">I want to see:</label>
			<br />
			<input
			  type="checkbox"
			  id="nature"
			  name="category"
			  value="1"
			  checked={selectedCategories.includes("1")}
			  onChange={handleCategoryChange}
			/>
			<label htmlFor="nature">Nature</label>
			<br />
			<input
			  type="checkbox"
			  id="museums"
			  name="category"
			  value="2"
			  checked={selectedCategories.includes("2")}
			  onChange={handleCategoryChange}
			/>
			<label htmlFor="museums">Museums</label>
			<br />
			<input
			  type="checkbox"
			  id="shopping"
			  name="category"
			  value="3"
			  checked={selectedCategories.includes("3")}
			  onChange={handleCategoryChange}
			/>
			<label htmlFor="shopping">Shopping</label>
			<br />
			<input
			  type="checkbox"
			  id="other"
			  name="category"
			  value="4"
			  checked={selectedCategories.includes("4")}
			  onChange={handleCategoryChange}
			/>
			<label htmlFor="other">Other</label>
		  </div>
		  <div>
			<label htmlFor="drive-time">i'm willing to drive:</label>
			<br />
			<select
			  id="drive-time"
			  name="drive-time"
			  value={selectedDriveTime}
			  onChange={handleDriveTimeChange}
			>
			  <option value="">Select Drive Time(times are one way)</option>
			  <option value="1">1 Hour</option>
			  <option value="2">2 Hours</option>
			  <option value="3">3 Hours</option>
			  <option value="4">4 Hours</option>
			</select>
		  </div>
		  <button type="submit">Search</button>
      </form>
      <ul>

	  {searchResults.map((result) => (
  <div key={result.id} className="location">
    <h3>{result.name}</h3>
    <p>
      <strong>Address:</strong> {result.address}
    </p>
    <img src={result.image} alt={result.name} className="location-image"/>
    <p>{result.description}</p>
    <p>
      <strong>Drive Time:</strong> {result.drive} hours
      <div class="save-button-container">
  <button onClick={() => saveTrip(result)}>Save Trip</button>
</div>
    </p>
  </div>
))}
      </ul>
    </>
  );
};
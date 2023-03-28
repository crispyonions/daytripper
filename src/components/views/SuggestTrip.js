import { useState } from "react";

export const SuggestTrip = () => {
  const [location, setLocation] = useState({
    name: "",
    description: "",
    address: "",
    category_id: 1,
    image: "",
    drive: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const locationToSendToApi = {
      name: location.name,
      description: location.description,
      address: location.address,
      category_id: parseInt(location.category_id),
      drive: parseInt(location.drive),
      image: location.image
    };
  
    fetch(`http://localhost:8088/locations?name=${location.name}`)
      .then((response) => response.json())
      .then((locations) => {
        if (locations.length > 0) {
          alert(`A trip with the name "${location.name}" has already been submitted. Please submit a different name.`);
          return;
        }
          fetch(`http://localhost:8088/locations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(locationToSendToApi),
        })
          .then((response) => response.json())
          .then(() => {
            alert("Your trip has been successfully submitted.");
          });
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div><h1>Suggest a Trip</h1>
        <label htmlFor="name">Name of location: </label>
        <input
          type="text"
          id="name"
          value={location.name}
          onChange={(e) => setLocation({ ...location, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">a brief description: </label>
        <textarea
          id="description"
          value={location.description}
          onChange={(e) =>
            setLocation({ ...location, description: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="image">Image Link: </label>
        <input
          type="text"
          id="image"
          value={location.image}
          onChange={(e) =>
            setLocation({ ...location, image: e.target.value })
          }
        />
      </div>
      {/* change this to access from API categories, vals will be category_id */}<div> 
        <label htmlFor="category_id">Category: </label>
        <select
          id="category_id"
          value={location.category_id}
          onChange={(e) =>
            setLocation({ ...location, category_id: e.target.value })
          }
        >
          <option value="1">Nature</option>
          <option value="2">Museum</option>
          <option value="3">Shopping</option>
          <option value="4">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="drive">estimated drive time: </label>
        <select
          id="drive"
          value={location.drive}
          onChange={(e) =>
            setLocation({ ...location, drive: e.target.value })
          }>
          <option value="1">1 hours</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
        </select>
      </div>
      <button type="submit">Submit Location</button>
    </form>
  );
};

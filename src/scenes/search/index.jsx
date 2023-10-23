import React from "react";
import { useState } from "react";

const Search = ({ onLatitude, onLongitude, onTemperature, onError }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const latitudeHandler = (event) => {
    setLatitude(event.target.value);
  };
  const longitudeHandler = (event) => {
    setLongitude(event.target.value);
  };
  const apiKey = "7e006a56658c67b8eb7799d3ed77e4a1";

  const searchHandler = async (event) => {
    event.preventDefault();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      try {
        const data = await response.json();
        onLatitude(latitude);
        onLongitude(longitude);
        onTemperature(data.main.temp);
      } catch (error) {
        console.log(error);
      }
    } else if (response.status === 400) {
      onError("Invalid Cordinates");
      onLatitude("");
      onLongitude("");
    }
  };

  return (
    <form>
      <div className="relative flex justify-center">
        <input
          type="search"
          id="latitude-search"
          className="text-gray-50 mx-2 block rounded-2xl border border-gray bg-background p-4 pl-10 text-sm"
          style={{ outline: "none", boxShadow: "none" }}
          placeholder="Latitude"
          onChange={latitudeHandler}
          value={latitude}
          required
        />
        <input
          type="search"
          id="longitude-search"
          className="text-gray-50 block rounded-2xl  border border-gray bg-background p-4 pl-10 text-sm"
          style={{ outline: "none", boxShadow: "none" }}
          placeholder="Longitude"
          onChange={longitudeHandler}
          value={longitude}
          required
        />
        <button
          onClick={searchHandler}
          type="submit"
          className=" hover-bg-grayDark focus-outline-none focus-ring-4 focus-ring-blue-300 mx-2 rounded-lg bg-gray px-4 text-sm font-medium text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;

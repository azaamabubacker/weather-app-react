import React, { useEffect, useState } from "react";

const WeatherForecast = ({ onLatitude, onLongitude, errorMessage }) => {
  const [forecastData, setForecastData] = useState([]);
  const [viewFullWeek, setViewFullWeek] = useState(false);

  useEffect(() => {
    // Your API call for the 5-day forecast using the provided latitude and longitude
    // Make sure to update this with your API call
    const apiKey = "7e006a56658c67b8eb7799d3ed77e4a1";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${onLatitude}&lon=${onLongitude}&appid=${apiKey}`;

    // Fetch the 5-day forecast data here
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Forecast data not found!");
        }
      })
      .then((data) => {
        // Process and set the forecast data as needed
        setForecastData(data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [onLatitude, onLongitude]);

  const handleViewFullWeek = () => {
    setViewFullWeek(true);
  };

  // This function filters the forecast data to show only the next 3 days
  const filterNext3Days = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight
    const next3Days = Array.from({ length: 3 }, (_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index);
      return date.toISOString().split("T")[0];
    });

    return forecastData.filter((item) => {
      const itemDate = item.dt_txt.split(" ")[0];
      return next3Days.includes(itemDate);
    });
  };

  const next3DaysForecast = filterNext3Days();

  return (
    <div className="text-textCol">
      {forecastData.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Weather Forecast</h2>
          <button
            onClick={handleViewFullWeek}
            className="rounded bg-secondary px-2  text-white"
          >
            View Full Week
          </button>
        </div>
      )}
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : viewFullWeek ? (
        <div className="flex flex-wrap">
          {forecastData.map((item, index) => (
            <div key={item.dt} className="p-4">
              <h3 className="text-lg font-semibold">{item.dt_txt}</h3>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Description: {item.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap">
          {next3DaysForecast.map((item, index) => (
            <div key={item.dt} className="p-4">
              <h3 className="text-lg font-semibold">{item.dt_txt}</h3>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Description: {item.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;

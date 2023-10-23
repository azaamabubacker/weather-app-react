import React, { useEffect, useState } from "react";

const WeatherForecast = ({
  onLatitude,
  onLongitude,
  errorMessage,
  onCityName,
}) => {
  const [forecastData, setForecastData] = useState([]);
  const [viewFullWeek, setViewFullWeek] = useState(false);

  useEffect(() => {
    const apiKey = "7e006a56658c67b8eb7799d3ed77e4a1";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${onLatitude}&lon=${onLongitude}&units=Metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Forecast data not found!");
        }
      })
      .then((data) => {
        setForecastData(data.list);
        onCityName(data.city.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [onLatitude, onLongitude]);

  const handleViewFullWeek = () => {
    setViewFullWeek(true);
  };

  const groupDataByDate = () => {
    const groupedData = {};
    forecastData.forEach((item) => {
      const itemDate = new Date(item.dt_txt.replace(" ", "T")); // Convert to a valid date format
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = itemDate.toLocaleDateString("en-US", options); // Get formatted date
      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = [];
      }
      groupedData[formattedDate].push(item);
    });
    return groupedData;
  };

  const groupedForecastData = groupDataByDate();
  const next3DaysForecast = Object.entries(groupedForecastData).slice(0, 3);

  const renderForecast = viewFullWeek
    ? Object.entries(groupedForecastData)
    : next3DaysForecast;

  return (
    <div className="text-textCol">
      {forecastData.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Weather Forecast</h2>
        </div>
      )}
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : (
        <div className="flex flex-wrap">
          {renderForecast.map(([formattedDate, items], index) => (
            <div
              key={formattedDate}
              className="p-4"
              style={{ flex: "1 0 100%" }}
            >
              <h3 className="text-lg font-semibold">{formattedDate}</h3>
              <div className="flex">
                {items.map((item) => (
                  <div key={item.dt} className="p-4">
                    <p>{item.dt_txt.split(" ")[1]}</p>
                    <p>{item.main.temp}°C</p>
                    <p>{item.weather[0].description}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                    />
                  </div>
                ))}
              </div>
              {index === 2 && !viewFullWeek && (
                <button
                  onClick={handleViewFullWeek}
                  className="mt-4 rounded bg-secondary px-2 text-white"
                >
                  View Full Week
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;

import React from "react";
import { useEffect, useState } from "react";

const Result = ({
  onLatitude,
  onLongitude,
  onTemperature,
  errorMessage,
  onCityName,
}) => {
  const [colomboWeather, setColomboWeather] = useState("");

  useEffect(() => {
    const apiKey = "7e006a56658c67b8eb7799d3ed77e4a1";
    const apiUrlColombo = `https://api.openweathermap.org/data/2.5/weather?q=Colombo&units=Metric&appid=${apiKey}`;

    fetch(apiUrlColombo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Weather not found!");
        }
      })
      .then((data) => {
        setColomboWeather(data.main.temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const coordinatesEmpty = onLatitude === "" || onLongitude === "";

  return (
    <div className="my-8 text-center font-medium text-secondary">
      {coordinatesEmpty ? (
        <>
          <p className="mb-2 text-3xl text-resultBlue">
            Today's Weather of Colombo
          </p>
          <p className="text-8xl text-resultBlue">{colomboWeather}°</p>
        </>
      ) : (
        <>
          <p className="mb-2 text-3xl text-resultBlue">
            {`Today's Weather of ${onCityName}`}
          </p>
          <p className="text-8xl text-resultBlue">{onTemperature}°</p>
        </>
      )}
    </div>
  );
};

export default Result;

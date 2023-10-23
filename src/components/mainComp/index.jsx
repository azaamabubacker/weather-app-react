import React, { useState } from "react";
import DailyForecast from "scenes/dailyForecast";
import HomePage from "scenes/homePage";
import Result from "scenes/results";
import Search from "scenes/search";

function MainApp() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [temperature, setTemperature] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <HomePage />
      <Search
        onLatitude={setLatitude}
        onLongitude={setLongitude}
        onTemperature={setTemperature}
        onError={setErrorMessage}
      />
      <Result
        onLatitude={latitude}
        onLongitude={longitude}
        onTemperature={temperature}
        errorMessage={errorMessage}
      />
      <DailyForecast onLatitude={latitude} onLongitude={longitude} />
    </div>
  );
}

export default MainApp;

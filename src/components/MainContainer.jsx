import React, { useState, useEffect } from "react";
//import "bulma";
import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";

function MainContainer() {
  const [weather, setWeather] = useState("");
  useEffect(() => {}, [weather]);

  function handleCityChange(data) {
    setWeather({
      cityName: data["name"],
      mainTemperature: data["main"]["temp"],
      tempMax: data["main"]["temp_max"],
      tempMin: data["main"]["temp_min"],
      humidity: data["main"]["humidity"],
      wind: data["main"]["wind"],
      description: data["weather"][0]["description"],
      dateTime: data.dt * 1000,
      imageUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    });
  }
  return (
    <section className={`section is-fluid`}>
      <div className="container is-max-desktop">
        <SearchBar onCityChange={handleCityChange} />
        <WeatherDetails weather={weather} />
      </div>
    </section>
  );
}
export default MainContainer;

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";

function MainContainer() {
  const [weather, setWeather] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {}, [weather]);

  function handleCityChange(data) {
    console.log(data);
    if (data) {
      setIsLoaded(true);
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
  }

  const weatherDetails = <WeatherDetails weather={weather} />;
  return (
    <section className={`section is-fluid`}>
      <div className="container is-max-desktop">
        <SearchBar onCityChange={handleCityChange} />
        {isLoaded ? weatherDetails : <div></div>}
      </div>
    </section>
  );
}
export default MainContainer;

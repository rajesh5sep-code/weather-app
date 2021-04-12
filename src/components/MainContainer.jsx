import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
import HourlyForcastContainer from "./HourlyForcastContainer";
import axios from "axios";
import Loader from "react-loader-spinner";

function MainContainer() {
  const [unitOfTemperature, setUnit] = useState("metric");
  const apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
  const unit = unitOfTemperature;
  let baseUrl = "https://api.openweathermap.org/data/2.5";

  const [weather, setWeather] = useState({});
  const [forcast, setForcast] = useState({});
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

  function getHourlyForcast() {
    const apiUrl = `${baseUrl}/forecast?q=${weather.cityName}&units=${unit}&appid=${apiKey}`;
    return axios.get(apiUrl);
  }

  function handleForcastDetails(data) {
    console.log(data);
    getHourlyForcast().then((response) => {
      const forcastData = response?.data;
      let weatherForcast = {};

      for (let index = 0; index < 6; index++) {
        const dayForcast = forcastData.list[index];
        weatherForcast[index] = dayForcast;
      }
      setForcast(weatherForcast);
    });
  }

  function WeatherAndForcast() {
    return (
      <>
        <WeatherDetails weather={weather} />
        <HourlyForcastContainer
          onForcastClick={handleForcastDetails}
          forcast={forcast}
        />
      </>
    );
  }

  return (
    <section className={`section is-fluid`}>
      <div className="container is-max-desktop">
        <SearchBar onCityChange={handleCityChange} />
        {isLoaded ? (
          <WeatherAndForcast />
        ) : (
          <Loader type="Circles" color="#0400ff" height={80} width={80} />
        )}
      </div>
    </section>
  );
}
export default MainContainer;

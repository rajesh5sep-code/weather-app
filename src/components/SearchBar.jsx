import React, { useState, useEffect } from "react";
import css from "../styles/SearchBar.module.scss";
import axios from "axios";

function SearchBar(props) {
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log(`City is ${city}`);
  }, [city]);

  function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayTemperature).catch(handleHttpErrors);

    apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    apiUrl = `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;
  }

  function displayTemperature({ data }) {
    console.log(data);
    data
      ? props.onCityChange({ ...data, isLoaded: true })
      : props.onCityChange({ isLoaded: false });
  }
  function handleHttpErrors({ response }) {
    if (response) {
      alert(response.data.message);
    }
  }
  function handleChange({ target }) {
    setCity(target.value);
  }

  function displayCurrentLocation(postions) {
    var latitude = postions.coords.latitude;
    var longitude = postions.coords.longitude;

    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let units = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature).catch(handleHttpErrors);
    apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    //axios.get(apiUrl).then(displayWeatherForecast);
  }

  function handleCurrentCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayCurrentLocation);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              value={city}
              onChange={handleChange}
            />
          </div>
          <div className="column">
            <input
              className={`button is-primary ${css.searchButton}`}
              type="submit"
              value="Search"
            />
            <button className="button" onClick={handleCurrentCity}>
              Current City
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;

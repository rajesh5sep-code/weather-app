import React, { useEffect, useState } from "react";
import css from "../styles/SearchBar.module.scss";
import axios from "axios";

function SearchBar(props) {
  const [isSearching, setSearching] = useState(false);
  const [city, setCity] = useState("");
  const [unitOfTemperature, setUnit] = useState("metric");
  useEffect(() => {
    props.onSearching(isSearching);
  }, [isSearching]);

  const apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
  const unit = unitOfTemperature;
  let baseUrl = "https://api.openweathermap.org/data/2.5";

  function handleSubmit(event) {
    event.preventDefault();
    getWeather().then(displayTemperature).catch(handleHttpErrors);
  }

  function getWeather() {
    setSearching(true);
    //props.onSearching(isSearching);
    const apiUrl = `${baseUrl}/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    return axios.get(apiUrl);
  }

  function displayTemperature({ data }) {
    setSearching(false);
    //props.onSearching(isSearching);

    data
      ? props.onCityChange({
          ...data,
          isLoaded: true,
          isSearching: isSearching,
        })
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

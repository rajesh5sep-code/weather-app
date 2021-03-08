import React, { useState, useEffect } from "react";
import css from "../styles/SearchBar.module.scss";
import axios from "axios";

function SearchBar(props) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    console.log(`City is ${city}`);
    console.log(`Weather  is ${JSON.stringify(weather)}`);
  }, [city, weather]);

  function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayCurrentTemperature);

    apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    apiUrl = `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;
  }

  function displayCurrentTemperature({ data }) {
    console.log(data);
    props.onCityChange(data);
  }

  function handleChange({ target }) {
    setCity(target.value);
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
            <button className="button">Current City</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;

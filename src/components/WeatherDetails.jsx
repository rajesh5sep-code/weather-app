import React from "react";
import { formatDate } from "../utilities/formatDateTime";
import css from "../styles/WeatherDetails.module.scss";

function WeatherDetails(props) {
  return (
    <>
      <div>
        <div className={css.cityName}>{props.weather.cityName}</div>
        <div className={css.dayTime}>{formatDate(props.weather.dateTime)}</div>
      </div>
      <div className="columns">
        <div className={`column`} style={{ display: "inline-block" }}>
          <div>
            <img
              src={props.weather.imageUrl}
              alt="weather icon"
              id="weather-img"
            />
            <span
              className={css.temperature}
              style={{ display: "inline-block" }}
            >
              {Math.round(props.weather.mainTemperature)}
            </span>
            <div className={css.unitsDescription}>
              <a>°C</a>|<a>°F</a>
            </div>
          </div>

          <p style={{ position: "relative", left: "100px" }}>
            {props.weather.description}
          </p>
        </div>

        <div className="column">
          <div>
            <div>
              High: <span id="max-temp">{props.weather.tempMax}</span>
            </div>
            <div>
              Low: <span id="min-temp">{props.weather.tempMin}</span>
            </div>
            <div>
              Humidity: <span id="humidity">{props.weather.humidity}</span>
            </div>
            <div>
              Wind: <span id="wind">{props.weather.wind}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherDetails;

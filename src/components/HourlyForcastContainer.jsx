import React from "react";
import PropTypes from "prop-types";

function HourlyForcastContainer(props) {
  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  function createForcastInfo() {
    console.log(props.forcast);

    const forecasts = [];
    for (const key in props.forcast) {
      if (Object.hasOwnProperty.call(props.forcast, key)) {
        const element = props.forcast[key];
        forecasts.push({
          hour: formatHours(element.dt),
          dt: element.dt,
          imageSrc: `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
          mainTemp: Math.round(element?.main?.temp),
        });
      }
    }

    return (
      <>
        <div className="columns">
          {forecasts.map((s) => (
            <div className="column" key={s.dt}>
              <div>
                <h5 style={{ textAlign: "center" }}>{s.hour}</h5>
                <img src={s.imageSrc} alt={`${s.dt}`}></img>
                <p style={{ textAlign: "center" }}>{s.mainTemp}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <section>
        <button className="button" onClick={props.onForcastClick}>
          Hourly Forcast
        </button>
        {createForcastInfo()}
      </section>
    </>
  );
}

HourlyForcastContainer.propTypes = {
  forcast: PropTypes.object.isRequired,
};

export default HourlyForcastContainer;

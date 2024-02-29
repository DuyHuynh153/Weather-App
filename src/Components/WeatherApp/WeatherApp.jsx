import React, { useState } from "react";
import "./WeatherApp.css";

import Seach_icon from "../Assets/search.png";
import Clear_icon from "../Assets/clear.png";
import Cloud_icon from "../Assets/cloud.png";
import Drizzle_icon from "../Assets/drizzle.png";
import Rain_icon from "../Assets/rain.png";
import Snow_icon from "../Assets/snow.png";
import Wind_icon from "../Assets/wind.png";
import Humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  let api_key = "deecbce0ce3b1c4c2c5f770d5d186254";
  const [wicon, setWicon] = useState(Cloud_icon);

  const search = async () => {
    try {
      const element = document.getElementsByClassName("Cityinput");

      if (element[0].value === "") {
        return 0;
      }

      console.log("you click the button search ");
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

      let respone = await fetch(url);

      if (!respone.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await respone.json();
      const humidity = document.getElementsByClassName("humidity");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(Clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(Cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(Drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(Drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(Rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(Rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(Snow_icon);
      } else {
        setWicon(Clear_icon);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      alert("please enter correct the name of city !");
      // Handle the error here, such as displaying an error message to the user.
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="Cityinput" placeholder="Seach" />
        <div className="search-icon">
          <img
            src={Seach_icon}
            alt=""
            onClick={() => {
              search();
            }}
          />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={Humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={Wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Win Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

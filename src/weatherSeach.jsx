// src/WeatherSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSearch = () => {
  const [city, setCity] = useState('Pietermaritzburg'); // Default city is Pietermaritzburg
  const [temperature, setTemperature] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = 'co074381e6bt4d73fa25655e15270480'; // Replace with your SheCodes API key

  // Fetch weather data when the component mounts or when city changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${API_KEY}`
        );

        setTemperature(response.data.daily[0].temperature.day); // Set current temperature
        setForecast(response.data.daily); // Set 5-day forecast data
        setError(null);
      } catch (error) {
        setError('City not found');
        setTemperature(null);
        setForecast([]);
      }
    };

    fetchWeather(); // Call the function to fetch the weather
  }, [city]); // Trigger when `city` changes

  const handleSearch = async (e) => {
    e.preventDefault();
    setCity(city); // Trigger the effect to fetch new data when the user searches
  };

  return (
    <div className="weather-search">
      <h1>Weather Search Engine</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {temperature !== null && <h2>Current Temperature: {temperature}°C</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display 5-day forecast */}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {forecast.map((day, index) => {
              const date = new Date(day.date); // Parse the date string
              const formattedDate = date.toLocaleDateString(); // Format the date

              return (
                <div key={index} className="forecast-day">
                  {/* <p>{formattedDate}</p> Display formatted date */}
                  <img
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                  <p>{Math.round(day.temperature.day)}°C</p>
                  <p>{day.condition.description}</p>
                </div>
              );
            })}
          </div>
          <h2>Created by Thandeka Portia P Mazibuko, open sourced on <a href="https://github.com/Thandekaportiap/week4_React">Github</a> and hosted on <a href="https://reactwearher.netlify.app/">netlify</a></h2>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;

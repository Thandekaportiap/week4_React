// src/WeatherSearch.js

import React, { useState } from 'react';
import axios from 'axios';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'co074381e6bt4d73fa25655e15270480'; // Replace with your SheCodes API key

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=${API_KEY}`
      );

      // Access the correct temperature data based on the response structure
      setTemperature(response.data.temperature.current);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('City not found');
      setTemperature(null); // Clear temperature if there's an error
    }
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
      {temperature !== null && <h2>Temperature: {temperature}°C</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WeatherSearch;

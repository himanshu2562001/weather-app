import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import SearchHistory from './components/SearchHistory';
import CurrentLocationButton from './components/CurrentLocationButton';

const apiKey = '8e62189aa0964eae92c72016242208';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchWeatherData = async (city) => {
    try {
      const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
      const data = await weatherResponse.json();
      if (data.location) {
        setWeatherData(data);
        fetchForecastData(city);
        addToSearchHistory(city);
      } else {
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`);
      const data = await forecastResponse.json();
      setForecastData(data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const addToSearchHistory = (city) => {
    if (!searchHistory.includes(city)) {//Purpose: This line checks whether the city is already included in the searchHistory array.
      setSearchHistory([city, ...searchHistory]);//Purpose: If the city is not already in the searchHistory array, this line adds it to the beginning of the array.
    }
  };

  const fetchWeatherDataByCoordinates = async (lat, lon) => {
    try {
      const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
      const data = await weatherResponse.json();
      if (data.location) {
        setWeatherData(data);
        fetchForecastDataByCoordinates(lat, lon);
      } else {
        alert('Unable to retrieve weather data for your location.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecastDataByCoordinates = async (lat, lon) => {
    try {
      const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=no`);
      const data = await forecastResponse.json();
      setForecastData(data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchForm onSearch={fetchWeatherData} />
      {weatherData && (
        <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
      )}
      <SearchHistory history={searchHistory} onSelectCity={fetchWeatherData} />
      <CurrentLocationButton onCurrentLocation={fetchWeatherDataByCoordinates} />
    </div>
  );
}

export default App;

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function WeatherDisplay({ weatherData, forecastData }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Use a ref to store the chart instance

  useEffect(() => {
    if (forecastData) {
      const labels = forecastData.forecast.forecastday.map(forecast =>
        new Date(forecast.date).toLocaleDateString()
      );
      const temperatures = forecastData.forecast.forecastday.map(forecast =>
        forecast.day.avgtemp_c
      );

      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create the chart and store the instance in the ref
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Average Temperature (°C)',
              data: temperatures,
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }
  }, [forecastData]);// This is the dependency array for the useEffect hook. It ensures that the chart is re-created whenever the forecastData prop changes.

  return (
    <div id="weather-container">
      <h2 id="city-name">{weatherData.location.name}</h2>
      <div id="current-weather">
        <img
          id="weather-icon"
          src={`https:${weatherData.current.condition.icon}`}
          alt="Weather Icon"
        />
        <div id="weather-description">{weatherData.current.condition.text}</div>
        <div id="temperature">Temperature: {weatherData.current.temp_c}°C</div>
        <div id="humidity">Humidity: {weatherData.current.humidity}%</div>
        <div id="wind">Wind: {weatherData.current.wind_kph}kph</div>
      </div>
      <h3>5-Day Forecast</h3>
      <div id="forecast-container">
        {forecastData &&
          forecastData.forecast.forecastday.map((forecast, index) => (
            <div key={index} className="forecast-item">
              <div>{new Date(forecast.date).toLocaleDateString()}</div>
              <img
                src={`https:${forecast.day.condition.icon}`}
                alt="Weather Icon"
              />
              <div>{forecast.day.avgtemp_c}°C</div>
            </div>
          ))}
      </div>
      <canvas ref={chartRef} id="weather-trend-chart" width="400" height="200"></canvas>
    </div>
  );
}

export default WeatherDisplay;

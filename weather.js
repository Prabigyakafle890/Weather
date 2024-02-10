// weather.js

const api_key = "3dd55e9e25d9e99723aca18bc6c347c8";

// Define setCurrentLocationWeather function
const setCurrentLocationWeather = (data) => {
  // Implementation of setCurrentLocationWeather, if needed
  // For example, you can update the cloud-icon and other UI elements
  updateWeatherIcon(data.weather[0].icon);
  document.getElementById("temperature").innerHTML = Math.floor(data.main.temp) + "°C";
  document.getElementById("location").innerHTML = data.name;
  document.getElementById("humidity").innerHTML = Math.floor(data.main.humidity) + "%";
  document.getElementById("windSpeed").innerHTML = Math.floor(data.wind.speed) + " km/h";
};

const updateWeatherIcon = (iconCode) => {
  // Implementation of updateWeatherIcon, if needed
  // For example, you can update the weatherIcon image source
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/w/${iconCode}.png`;
};

const search = async () => {
  const element = document.querySelector(".city-input");
  if (element.value === '' || element.length === 0) {
    getCurrentLocationWeather();
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();

      setCurrentLocationWeather(data);
    } catch (error) {
      console.error("Error fetching data for searched location:", error);
      alert("Sorry the weather for provided location is not avilable.Please try again.");
    }
  }
};

const getCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCurrentLocationWeather(data);
      } catch (error) {
        console.error("Error fetching data for current location:", error);
        alert("Error fetching data for searched location. Please try again.");
      }
    });
  }
};


getCurrentLocationWeather();

function showCurrentTemp(response) {
  console.log(response);
  let tempature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${tempature}°F`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}mph`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
}

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchBox");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${cityInput.value}`;
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "imperial";
  axios
    .get(`${apiUrl}q=${cityInput.value}&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}
let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchInput);

function showLocationTemp(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${city}`;

  let tempature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${tempature}°F`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}mph`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(showLocationTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-btn");
locationButton.addEventListener("click", getCurrentLocation);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = `${day} ${hours}:${minutes}`;
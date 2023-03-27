function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function showCurrentTemp(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let tempature = document.querySelector("#current-temp");
  tempature.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let currentdate = document.querySelector("#date-time");
  currentdate.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "9d256541562f8d22893f524e36f1e610";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#currentLocation-btn");
locationButton.addEventListener("click", getCurrentLocation);

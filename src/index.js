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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecastDate">${formatDay(forecastDay.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="46"
                />
                <div class="forecastTempatures">
                  <span class="forecastTempatureMax"> ${Math.round(
                    forecastDay.temperature.maximum
                  )}° </span>
                  <span class="forecastTempatureMin"> ${Math.round(
                    forecastDay.temperature.minimum
                  )}° </span>
                </div>
              </div>
            
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "354625fc8tco3a0bc76af830b102d699";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemp(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;

  fahrenheitTemp = response.data.temperature.current;

  let tempature = document.querySelector("#current-temp");
  tempature.innerHTML = Math.round(fahrenheitTemp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let currentdate = document.querySelector("#date-time");
  currentdate.innerHTML = formatDate(response.data.time * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchBox");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${cityInput.value}`;
  let apiKey = "354625fc8tco3a0bc76af830b102d699";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  let units = "imperial";
  axios
    .get(`${apiUrl}query=${cityInput.value}&key=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}
let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchInput);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "354625fc8tco3a0bc76af830b102d699";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios
    .get(`${apiUrl}lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#currentLocation-btn");
locationButton.addEventListener("click", getCurrentLocation);

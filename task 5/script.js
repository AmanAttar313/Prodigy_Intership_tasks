const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("location").textContent = data.name + ", " + data.sys.country;
                document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById("condition").textContent = data.weather[0].description;
                document.getElementById("details").textContent = `Wind: ${data.wind.speed} km/h | Humidity: ${data.main.humidity}%`;
                document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            } else {
                alert("City not found!");
            }
        })
        .catch(() => alert("Error fetching data."));
}

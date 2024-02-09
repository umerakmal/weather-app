const apikey = "5f8d758bbacdd93d02768483d3b5dfbf";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const refresh = document.querySelector(".refresh-btn");


async function checkWeather(city) {
    const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
    const data = await response.json();

    if (data.weather && data.weather.length > 0) {
        document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.querySelector(".condition").innerHTML = data.weather[0].main;
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } else {
        document.querySelector(".city").innerHTML = "No City Found";
    }
}


async function initialize() {
    await checkWeather("lahore");
    setInterval(() => {
        checkWeather(searchBox.value || "lahore");
    }, 3600000); 
}

initialize(); 


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

refresh.addEventListener('click', ()=> {
    checkWeather(searchBox.value || "lahore");
})

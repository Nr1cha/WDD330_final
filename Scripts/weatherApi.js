// select HTML elements in the document
// how to search by city name and or zip code
//https://openweathermap.org/current#name
// API URL
const url =
    "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=72c90fbdfbdb409e818bc324052dfcd3"; //WDD330 API key
// const page = document.querySelector("");

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data; //added this here.
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// display the results in the weather cell section
function displayResults(weatherdata) {
    // console.log(weatherdata);
    const weatherContainer = document.querySelector("#weather-container"); // get the parent container

    // creating child elements
    const weatherIcon = document.createElement("img");
    const currentTemp = document.createElement("p");
    const windSpeed = document.createElement("p");
    const captionDesc = document.createElement("p");
    
    // add a class name to each created element
    weatherIcon.classList.add("weather-icon");
    weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`);
    currentTemp.classList.add("current-temp");
    windSpeed.classList.add("wind-speed");
    captionDesc.classList.add("caption-desc");


    // append the elements to the parent element
    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(currentTemp);
    weatherContainer.appendChild(windSpeed);
    weatherContainer.appendChild(captionDesc);

    // const windChill = document.querySelector("wind-chill");

    // adding data from the API to the page
    const currentTempFixed = weatherdata.main.temp.toFixed(0);
    currentTemp.textContent = "Current Temperature: " + currentTempFixed;

    const windSpeedFixed = weatherdata.wind.speed.toFixed(0);
    windSpeed.textContent = "WindSpeed: " + windSpeedFixed;
    // console.log(weatherdata.wind.speed, weatherdata.main.temp, windChill )
    // windChill(weatherdata.wind.speed, weatherdata.main.temp);

    // weatherIcon.src = `https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`;
    captionDesc.textContent = "Description: " + weatherdata.weather[0].description;
}

async function init() {
    const data = await apiFetch();
    displayResults(data);
}
init();
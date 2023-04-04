async function getUserSearchValue() {
    let userValue = document.querySelector("#searchBox").value;
    const data = await apiFetch(userValue);
    displayResults(data);
    return userValue;
}

const goButton = document.querySelector("#searchButton"); //SEARCH BUTTON
const goInput = document.querySelector("#searchBox");

goButton.addEventListener("click", getUserSearchValue);
goInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getUserSearchValue();
    }
});

const favoritesListSearch = document.querySelector("#favList");
favoritesListSearch.addEventListener("change", async (event) => {
    const data = await apiFetch(favoritesList.value);
    displayResults(data);
    console.log(favoritesListSearch.value);
});
// atta

//https://openweathermap.org/current#name
// API URL
async function apiFetch(userValue = "seattle") {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userValue}&units=imperial&appid=72c90fbdfbdb409e818bc324052dfcd3&cnt=8`;
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
    weatherdata.list.forEach((day) => {
        const weatherContainer = document.querySelector("#weather-item"); // get the parent container

        // creating child elements
        const weatherBox = document.createElement("div")
        const weatherIcon = document.createElement("img");
        const currentTemp = document.createElement("p");
        const windSpeed = document.createElement("p");
        const captionDesc = document.createElement("p");
        const sunRise = document.createElement("p");

        // add a class name to each created element
        weatherIcon.classList.add("weather-icon");

        weatherIcon.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
        );
        currentTemp.classList.add("current-temp");
        windSpeed.classList.add("wind-speed");
        captionDesc.classList.add("caption-desc");
        sunRise.classList.add("sunRise");

        // append the elements to the parent element
        weatherContainer.appendChild(weatherBox);
        weatherBox.appendChild(weatherIcon);
        weatherBox.appendChild(currentTemp);
        weatherBox.appendChild(windSpeed);
        weatherBox.appendChild(captionDesc);
        weatherBox.appendChild(sunRise);

        // const windChill = document.querySelector("wind-chill");

        // adding data from the API to the page
        const currentTempFixed = day.main.temp.toFixed(0);
        currentTemp.textContent = `Current Temperature: ${currentTempFixed}\u00B0F`;

        const windSpeedFixed = day.wind.speed.toFixed(0);
        windSpeed.textContent = `WindSpeed: ${windSpeedFixed} \u006D\u0070\u0068`;
        // console.log(day.wind.speed, day.main.temp, windChill )
        // windChill(day.wind.speed, day.main.temp);

        // weatherIcon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        captionDesc.textContent =
            "Description: " + day.weather[0].description;
        sunriseEpoch = new Date(day.sys.sunrise);
        sunRise.textContent = "Sunrise: " + sunriseEpoch;
    });
}

async function init() {
    const data = await apiFetch("seattle");
    displayResults(data);
}
init();

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

// API URL
async function latLong(userValue = "seattle") {
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${userValue}&appid=72c90fbdfbdb409e818bc324052dfcd3&limit=1`; // get lat long
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
async function apiFetch(userValue = "seattle") {
    try {
        const location = await latLong(userValue);
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location[0].lat}&lon=${location[0].lon}&units=imperial&appid=72c90fbdfbdb409e818bc324052dfcd3&cnt=8`;
        const response = await fetch(url);
        if (response.ok) {
            const weatherdata = await response.json();
            return {
                weatherdata,
                location
            };
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function formatToday(epochDate) {
    return  new Date(epochDate * 1000).toLocaleDateString("en-US", {weekday: 'short', day: 'numeric', month: 'numeric'})
}

// display the results in the weather cell section
function displayResults({ weatherdata, location } = {}) {
    const weatherContainer = document.querySelector("#weather-item");
    weatherContainer.innerHTML = "";

    // CREATING LOCATION TAGS
    const locationContainer = document.querySelector("#location-container");
    locationContainer.innerHTML = "";
    const locationName = document.createElement("p");
    locationName.innerText = location[0].name;
    locationContainer.appendChild(locationName);

    weatherdata.daily.forEach((day, index) => {
        const weatherBox = document.createElement("div");
        const dateFormatted = document.createElement("p");
        const weatherIcon = document.createElement("img");
        const currentTemp = document.createElement("p");
        const maxMinTemp = document.createElement("p");
        const windSpeed = document.createElement("p");
        const captionDesc = document.createElement("p");
        const humidity = document.createElement("p");
        const uvIndex = document.createElement("p");
        const sunRise = document.createElement("p");
        const sunSet = document.createElement("p");

        weatherIcon.classList.add("weather-icon");

        weatherIcon.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
        );
        currentTemp.classList.add("current-temp");
        maxMinTemp.classList.add("maxMin-temp");
        windSpeed.classList.add("wind-speed");
        captionDesc.classList.add("caption-desc");
        humidity.classList.add("humidity");
        uvIndex.classList.add("uv_index");
        sunRise.classList.add("sunrise");
        sunSet.classList.add("sunSet");

        weatherContainer.appendChild(weatherBox);
        weatherBox.appendChild(dateFormatted);
        weatherBox.appendChild(weatherIcon);
        weatherBox.appendChild(currentTemp);
        weatherBox.appendChild(maxMinTemp);
        weatherBox.appendChild(captionDesc);
        weatherBox.appendChild(windSpeed);
        weatherBox.appendChild(humidity);
        weatherBox.appendChild(uvIndex);
        weatherBox.appendChild(sunRise);
        weatherBox.appendChild(sunSet);
        let currentTempFixed;
        if (index === 0) {
            currentTempFixed = weatherdata.current.temp.toFixed(0);
            dateFormatted.textContent = `TODAY`;
        } else {
            let formattedDate = formatToday(day.dt).toUpperCase().replace(",", " ");
            dateFormatted.textContent = `${formattedDate}`;
            currentTempFixed = day.temp.day.toFixed(0);
        }

        currentTemp.textContent = `${currentTempFixed}\u00B0F`;
        const maxTempFixed = day.temp.max.toFixed(0);
        const lowTempFixed = day.temp.min.toFixed(0);
        maxMinTemp.textContent = `${maxTempFixed}\u00B0 | ${lowTempFixed}\u00B0F`;

        const windSpeedFixed = day.wind_speed.toFixed(0);
        windSpeed.textContent = `Wind: ${windSpeedFixed} \u006D\u0070\u0068`;

        const weatherDescription = day.weather[0].description;
        const descriptionWords = weatherDescription.split(" ");

        for (let i = 0; i < descriptionWords.length; i++) {
            descriptionWords[i] =
                descriptionWords[i][0].toUpperCase() +
                descriptionWords[i].substr(1);
        }
        captionDesc.textContent = descriptionWords.join(" ");

        const humidity1 = day.humidity.toFixed(0);
        humidity.textContent = `Humidity: ${humidity1}\u0025`;

        const sunriseEpoch = new Date(day.sunrise);
        const sunriseString = new Date(sunriseEpoch * 1000).toLocaleTimeString(
            "en-US",
            { hours: "number" }
        );
        sunRise.textContent = `Sunrise: ${sunriseString}`;

        const sunsetEpoch = new Date(day.sunset);
        const sunsetString = new Date(sunsetEpoch * 1000).toLocaleTimeString(
            "en-US",
            { hours: "number" }
        );
        sunSet.textContent = `Sunset: ${sunsetString}`;

        const uvI = day.uvi.toFixed(0);
        uvIndex.textContent = `UV Index: ${uvI} / 11`;

    });
}

async function init() {
    const data = await apiFetch("seattle");
    displayResults(data);
}
init();

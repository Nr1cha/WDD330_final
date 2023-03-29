async function getUserSearchValue(){
    let userValue = document.querySelector("#searchBox").value;
    const data = await apiFetch(userValue);
    displayResults(data);
    return userValue;
};

const goButton = document.querySelector('#searchButton');
const goInput = document.querySelector('#searchBox');

goButton.addEventListener("click", getUserSearchValue);
goInput.addEventListener("keypress", (event) => {
    if(event.key === 'Enter') {
        getUserSearchValue();
    }
});

const favoritesListSearch = document.querySelector("#favList");
favoritesListSearch.addEventListener("change",async(event) => {
    const data = await apiFetch(favoritesList.value);
    displayResults(data);
    console.log(favoritesListSearch.value);
})
// atta

//https://openweathermap.org/current#name
// API URL
async function apiFetch(userValue = 'seattle') {
    try {
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${userValue}&units=imperial&appid=72c90fbdfbdb409e818bc324052dfcd3`;
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
    const sunRise = document.createElement("p");
    
    // add a class name to each created element
    weatherIcon.classList.add("weather-icon");
    weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`);
    currentTemp.classList.add("current-temp");
    windSpeed.classList.add("wind-speed");
    captionDesc.classList.add("caption-desc");
    sunRise.classList.add("sunRise");


    // append the elements to the parent element
    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(currentTemp);
    weatherContainer.appendChild(windSpeed);
    weatherContainer.appendChild(captionDesc);
    weatherContainer.appendChild(sunRise);

    // const windChill = document.querySelector("wind-chill");

    // adding data from the API to the page
    const currentTempFixed = weatherdata.main.temp.toFixed(0);
    currentTemp.textContent = `Current Temperature: ${currentTempFixed}\u00B0F`;

    const windSpeedFixed = weatherdata.wind.speed.toFixed(0);
    windSpeed.textContent = `WindSpeed: ${windSpeedFixed} \u006D\u0070\u0068`;
    // console.log(weatherdata.wind.speed, weatherdata.main.temp, windChill )
    // windChill(weatherdata.wind.speed, weatherdata.main.temp);

    // weatherIcon.src = `https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`;
    captionDesc.textContent = "Description: " + weatherdata.weather[0].description;
    sunriseEpoch = new Date(weatherdata.sys.sunrise);
    sunRise.textContent = "Sunrise: " + sunriseEpoch;
}

async function init() {
    const data = await apiFetch('seattle');
    displayResults(data);
}
init();
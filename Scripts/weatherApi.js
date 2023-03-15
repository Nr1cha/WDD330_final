// select HTML elements in the document
// API URL
const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=41.034878&lon=-111.938644&units=imperial&appid=72c90fbdfbdb409e818bc324052dfcd3"; //WDD330 API key 
const page = document.querySelector("");

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
    const currentTemp = document.querySelector(""); // current temp
    const weatherIcon = document.querySelector(""); // icon
    const captionDesc = document.querySelector(""); // caption
    const windSpeed = document.querySelector(""); // wind info
    // const windChill = document.querySelector("wind-chill");

    // adding data from the API to the page
    const currentTempFixed = weatherdata.main.temp.toFixed(0);
    currentTemp.textContent = currentTempFixed;

    const windSpeedFixed = weatherdata.wind.speed.toFixed(0);
    windSpeed.textContent = windSpeedFixed;
    // console.log(weatherdata.wind.speed, weatherdata.main.temp, windChill )
    windChill(weatherdata.wind.speed, weatherdata.main.temp);

    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`;
    captionDesc.textContent = weatherdata.weather[0].description;
}

async function init() {
    const data = await apiFetch();
    displayResults(data);
}
init();
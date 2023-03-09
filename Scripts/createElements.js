// Get 8 items from the OpenWeatherAPI
const weatherData = [item1, item2, item3, item4, item5, item6, item7, item8];

// Select the container element to add the list
const container = document.getElementById("weather-container");

// Create an unordered list element and append it to the container
const ul = document.createElement("ul");
container.appendChild(ul);

// Loop through the weatherData array and create a list item for each item
for (let i = 0; i < weatherData.length; i++) {
    const li = document.createElement("li");
    li.textContent = weatherData[i].name; // Replace ".name" with the appropriate property for each item

    // Create two additional elements inside the list item
    const temp = document.createElement("p");
    const humidity = document.createElement("p");

    // Populate the additional elements with data from the weather data object
    temp.textContent = weatherData[i].name;
    humidity.textContent = weatherData[i].temperature; // Replace ".temperature" with the appropriate property for each item

    // Append the additional elements to the list item
    li.appendChild(temp);
    li.appendChild(humidity);

    // Append the list item to the unordered list
    ul.appendChild(li);
}

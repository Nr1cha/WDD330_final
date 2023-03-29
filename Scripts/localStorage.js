let locationsList = [];

// GETTING ITEMS FROM THE PAGE

// city text field
const locationSearch = document.querySelector("#searchBox");

// favorites button
const favButton = document.querySelector("#addToFav");

favButton.addEventListener("click", function () {
    // get the value of the item typed
    let searchTerm = locationSearch.value;
    // Add the search term to the search history array
    locationsList.push(searchTerm);
});

// list of favorites that are from localStorage
const favoritesList = document.querySelector("#favList");

// ADDING THINGS TO LOCAL STORAGE

// store the city in text field to local storage
localStorage.setItem("cityLocation", JSON.stringify(locationsList));

// GETTING THINGS FROM LOCAL STORAGE

// get the stored value in localStorage
let listItems = JSON.parse(localStorage.getItem("cityLocation"));

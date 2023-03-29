// get items from weather page
const searchFavorite = document.querySelector("#addToFav");
const favoritesList = document.querySelector("#favList");

// get the stored value in localStorage
let numVisits = Number(window.localStorage.getItem(""));

// store the new number of visits value
localStorage.setItem("", numVisits);

// show todays date.
// todayDisplayDate.textContent = Date.now();
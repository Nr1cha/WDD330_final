// initialize display elements
const todayDisplayDate = document.querySelector("");
const visitsDisplay = document.querySelector("");
const latestVisit = document.querySelector("");

// get items from weather page
const searchFavorite = document.querySelector("#addToFav");
const favoritesList = document.querySelector("#favList");

// get the stored value in localStorage
let numVisits = Number(window.localStorage.getItem(""));

// last visit timestamp
let lastVisit = Number(window.localStorage.getItem(""));

// determine if this is the first visit or display the number of visits.
if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `This is your first visit!`;
}

// increment the number of visits.
numVisits++;
// store the new number of visits value
localStorage.setItem("", numVisits);
// show todays date.
todayDisplayDate.textContent = Date.now();
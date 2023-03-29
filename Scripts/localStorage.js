// GETTING ITEMS FROM THE PAGE

// city text field
const locationSearch = document.querySelector("#searchBox");

// favorites button
const favButton = document.querySelector("#addToFav");

// adding event listener to a button
favButton.addEventListener("click", function () {
    // get the value of the item typed
    let searchTerm = locationSearch.value;
    
    // Log the array to the console
    addToLocalStorage(searchTerm);
	updateFavList();
});

// list of favorites that are from localStorage
const favoritesList = document.querySelector("#favList");

// ADDING THINGS TO LOCAL STORAGE

// store the city in text field to local storage
function addToLocalStorage(searchTerm) {
    let listItems = JSON.parse(localStorage.getItem("cityLocation"));
	listItems.push(searchTerm);
    localStorage.setItem("cityLocation", JSON.stringify(listItems));
}

function updateFavList() {
    // get the stored value in localStorage
    let listItems = JSON.parse(localStorage.getItem("cityLocation"));
	favoritesList.options.length = 0;
    for (let i = 0; i < listItems.length; i++) {
        let option = document.createElement("option");
        option.value = listItems[i];
        option.text = listItems[i];
        favoritesList.appendChild(option);
    }
}
updateFavList();
// GETTING THINGS FROM LOCAL STORAGE

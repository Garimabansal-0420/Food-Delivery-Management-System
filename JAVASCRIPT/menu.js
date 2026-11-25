


const SELECTED_RESTAURANT_KEY = "foodiehub_selected_restaurant";

const menuCards = Array.from(
    document.querySelectorAll(".foodcontainer .card1")
);

const searchInput = document.querySelector("#searchDish");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const loadMoreContainer = document.querySelector(".load-more-container");
const noDish = document.querySelector("#noDish");

const restaurantBanner = document.querySelector("#selectedRestaurantBanner");
const restaurantNameElement = document.querySelector("#selectedRestaurantName");
const restaurantCuisineElement = document.querySelector("#selectedRestaurantCuisine");
const viewAllMenuButton = document.querySelector("#viewAllMenu");




const categoryCuisineMap = {
    "chatpata swaad": ["north indian", "indian", "snacks", "fast food"],
    "manchurian": ["chinese", "asian"],
    "veg dishes": ["chinese", "asian"],
    "thali's special": ["north indian", "indian", "punjabi"],
    "tandoori breads": ["north indian", "indian", "mughlai", "tandoori"],
    "subah ka nashta": ["north indian", "indian", "snacks"],
    "beverages": ["beverages"],
    "tandoor paranthas": ["north indian", "indian", "punjabi"],
    "tawa paranthas": ["north indian", "indian", "punjabi"],
    "snacks": ["snacks", "fast food"],
    "chowmein & fried rice": ["chinese", "asian"],
    "south indian — dosas": ["south indian"],
    "south indian": ["south indian"],
    "kofta & paneer": ["north indian", "indian", "punjabi", "mughlai"],
    "paneer special": ["north indian", "indian", "punjabi", "mughlai"],
    "dal & subzi": ["north indian", "indian", "punjabi"]
};




function getSelectedRestaurant() {
    try {
        return JSON.parse(
            localStorage.getItem(SELECTED_RESTAURANT_KEY)
        );
    } catch (error) {
        console.error("Restaurant data error:", error);
        return null;
    }
}

let selectedRestaurant = getSelectedRestaurant();




function displayRestaurantBanner() {

    if (!selectedRestaurant) {
        restaurantBanner.hidden = true;
        return;
    }

    restaurantBanner.hidden = false;

    restaurantNameElement.textContent =
        selectedRestaurant.name + " Menu";

    restaurantCuisineElement.textContent =
        "Cuisine: " + selectedRestaurant.cuisine;
}




function getRestaurantMenu() {

    if (!selectedRestaurant) {
        return [...menuCards];
    }

    const restaurantCuisines = (
        selectedRestaurant.cuisine || ""
    )
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

    return menuCards.filter(card => {

        const category = card
            .querySelector(".itemname h1")
            .innerText
            .trim()
            .toLowerCase();

        const categoryCuisines =
            categoryCuisineMap[category] || [];

        return categoryCuisines.some(cuisine =>
            restaurantCuisines.includes(cuisine)
        );
    });
}



let visibleCards = 3;
const cardsPerClick = 3;

let restaurantMenu = getRestaurantMenu();
let filteredCards = [...restaurantMenu];



function displayCards() {

    menuCards.forEach(card => {
        card.hidden = true;
    });

    filteredCards.forEach((card, index) => {

        if (index < visibleCards) {
            card.hidden = false;
        }
    });

    loadMoreContainer.hidden =
        visibleCards >= filteredCards.length;

    noDish.hidden = filteredCards.length !== 0;

    if (filteredCards.length === 0) {
        noDish.textContent = selectedRestaurant
            ? "No dishes are currently available for this restaurant. Please check back later!"
            : "No matching dishes found!";
    }
}



searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    filteredCards = restaurantMenu.filter(card => {

        const heading = card
            .querySelector(".itemname h1")
            .innerText
            .toLowerCase();

        const dishes = Array.from(
            card.querySelectorAll(".item")
        )
        .map(item => {

            const copy = item.cloneNode(true);

            copy.querySelectorAll("button").forEach(button => {
                button.remove();
            });

            return copy.innerText.toLowerCase();

        }).join(" ");

        return heading.includes(searchValue) ||
               dishes.includes(searchValue);
    });

    visibleCards = 3;

    displayCards();
});




loadMoreBtn.addEventListener("click", function () {

    visibleCards += cardsPerClick;

    displayCards();
});



viewAllMenuButton.addEventListener("click", function () {

    localStorage.removeItem(SELECTED_RESTAURANT_KEY);

    selectedRestaurant = null;

    restaurantMenu = [...menuCards];
    filteredCards = [...restaurantMenu];

    searchInput.value = "";
    visibleCards = 3;

    displayRestaurantBanner();
    displayCards();

    window.scrollTo({
        top: document.querySelector(".foodcontainer").offsetTop,
        behavior: "smooth"
    });
});




menuCards.forEach((card, cardIndex) => {

    const items = card.querySelectorAll(".item");

    items.forEach((item, itemIndex) => {

       

        if (item.querySelector("p")) {
            return;
        }

        

        const dishName = Array.from(item.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent)
            .join("")
            .replace(/^[✓✔\s]+/, "")
            .trim();

        if (!dishName) {
            return;
        }

        

        const priceElement = item.querySelector("span");

        const dishPrice = priceElement
            ? Number(priceElement.innerText.replace(/[^\d.]/g, ""))
            : 0;

       

        const category = card
            .querySelector(".itemname h1")
            .innerText
            .trim();

     

        const restaurantId = selectedRestaurant
            ? selectedRestaurant.id
            : "general-menu";

        const dishId =
            `${restaurantId}-menu-${cardIndex}-${itemIndex}`;

   

        if (item.querySelector(".add-cart-btn")) {
            return;
        }

        

        const addButton = document.createElement("button");

        addButton.type = "button";
        addButton.innerText = "Add";
        addButton.classList.add("add-cart-btn");

        

        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.innerText = "Remove";
        removeButton.classList.add("remove-cart-btn");

        item.appendChild(addButton);
        item.appendChild(removeButton);

        

        addButton.addEventListener("click", function () {

            FoodieHubCart.add({
                id: dishId,
                name: dishName,
                price: dishPrice,
                category: category,
                restaurant: selectedRestaurant
                    ? selectedRestaurant.name
                    : "FoodieHub Menu",
                source: "menu"
            });

        });

        

        removeButton.addEventListener("click", function () {

            const removed = FoodieHubCart.removeOne(dishId);

            if (!removed) {
                alert("This item is not in your cart!");
            }
        });
    });
});




displayRestaurantBanner();
displayCards();

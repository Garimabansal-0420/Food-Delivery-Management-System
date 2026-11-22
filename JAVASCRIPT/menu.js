
// =====================================
// FOODIEHUB MENU FUNCTIONALITY
// =====================================

const menuContainer = document.querySelector(".foodcontainer");

const menuCards = Array.from(
    document.querySelectorAll(".foodcontainer .card1")
);

const searchInput = document.querySelector("#searchDish");

const loadMoreBtn = document.querySelector("#loadMoreBtn");

const loadMoreContainer = document.querySelector(".load-more-container");

const noDish = document.querySelector("#noDish");

const cartCount = document.querySelector("#cartCount");


// =====================================
// LOAD MORE VARIABLES
// =====================================

let visibleCards = 3;

const cardsPerClick = 3;

let filteredCards = [...menuCards];


// =====================================
// CART VARIABLES
// =====================================

let totalCartItems = 0;

// Store quantity of each individual dish
const dishQuantities = new Map();


// =====================================
// INITIALIZE MENU
// =====================================

function displayCards() {

    menuCards.forEach(card => {
        card.hidden = true;
    });

    filteredCards.forEach((card, index) => {

        if (index < visibleCards) {
            card.hidden = false;
        }

    });

    // Show or hide Load More button

    if (visibleCards >= filteredCards.length) {
        loadMoreContainer.hidden = true;
    } else {
        loadMoreContainer.hidden = false;
    }

    // Show message if no cards match

    noDish.hidden = filteredCards.length !== 0;
}


// Initially show only 3 cards

displayCards();


// =====================================
// LOAD MORE BUTTON
// =====================================

loadMoreBtn.addEventListener("click", function () {

    visibleCards += cardsPerClick;

    displayCards();

});


// =====================================
// SEARCH MENU
// =====================================

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    // Search menu heading and individual dishes

    filteredCards = menuCards.filter(card => {

        const heading = card
            .querySelector(".itemname h1")
            .innerText
            .toLowerCase();

        const dishes = Array.from(
            card.querySelectorAll(".item")
        )
        .map(item => item.innerText.toLowerCase())
        .join(" ");

        return heading.includes(searchValue) ||
               dishes.includes(searchValue);

    });

    // Reset visible cards after searching

    visibleCards = 3;

    displayCards();

});


// =====================================
// ADD AND REMOVE BUTTONS
// =====================================

// Add buttons to every food item

menuCards.forEach((card, cardIndex) => {

    const items = card.querySelectorAll(".item");

    items.forEach((item, itemIndex) => {

        // Skip description paragraphs

        if (item.querySelector("p")) {
            return;
        }

        // Create a unique ID for every dish

        const dishId = `${cardIndex}-${itemIndex}`;

        dishQuantities.set(dishId, 0);


        // ADD BUTTON

        const addButton = document.createElement("button");

        addButton.type = "button";

        addButton.innerText = "Add";

        addButton.classList.add("add-cart-btn");


        // REMOVE BUTTON

        const removeButton = document.createElement("button");

        removeButton.type = "button";

        removeButton.innerText = "Remove";

        removeButton.classList.add("remove-cart-btn");


        // Add buttons to the food item

        item.appendChild(addButton);

        item.appendChild(removeButton);


        // =====================================
        // ADD ITEM TO CART
        // =====================================

        addButton.addEventListener("click", function () {

            let quantity = dishQuantities.get(dishId);

            quantity++;

            dishQuantities.set(dishId, quantity);

            totalCartItems++;

            cartCount.innerText = totalCartItems;

        });


        // =====================================
        // REMOVE ITEM FROM CART
        // =====================================

        removeButton.addEventListener("click", function () {

            // Check if cart is already empty

            if (totalCartItems === 0 ||
                dishQuantities.get(dishId) === 0) {

                alert("No items in cart!");

                return;
            }

            let quantity = dishQuantities.get(dishId);

            quantity--;

            dishQuantities.set(dishId, quantity);

            totalCartItems--;

            cartCount.innerText = totalCartItems;

        });

    });

});

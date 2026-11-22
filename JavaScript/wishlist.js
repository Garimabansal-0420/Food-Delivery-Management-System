// =============================
// SORT RESTAURANTS
// =============================

let sortSelect = document.querySelector(".sort-select");
let restaurantGrid = document.querySelector(".restaurant-grid");

sortSelect.addEventListener("change", function () {

    let restaurants = Array.from(
        restaurantGrid.querySelectorAll(".restaurant-card")
    );

    let selectedOption = sortSelect.value;

    restaurants.sort(function (a, b) {

        // GET RESTAURANT NAME
        let nameA = a.querySelector("h2").innerText.toLowerCase();
        let nameB = b.querySelector("h2").innerText.toLowerCase();

        // GET RATING
        let ratingA = parseFloat(a.querySelector(".rating span:last-child").innerText);
        let ratingB = parseFloat(b.querySelector(".rating span:last-child").innerText);

        // GET PRICE
        let priceA = parseInt(a.querySelector(".price-overlay").innerText.replace(/\D/g, ""));
        let priceB = parseInt(b.querySelector(".price-overlay").innerText.replace(/\D/g, ""));

        // SORTING CONDITIONS

        if (selectedOption === "Rating: High to Low") {
            return ratingB - ratingA;
        }

        else if (selectedOption === "Rating: Low to High") {
            return ratingA - ratingB;
        }

        else if (selectedOption === "Name: A to Z") {
            return nameA.localeCompare(nameB);
        }

        else if (selectedOption === "Name: Z to A") {
            return nameB.localeCompare(nameA);
        }

        else if (selectedOption === "Price: Low to High") {
            return priceA - priceB;
        }

        else if (selectedOption === "Price: High to Low") {
            return priceB - priceA;
        }

    });

    // ADD SORTED CARDS BACK TO THE GRID

    restaurants.forEach(function (restaurant) {
        restaurantGrid.appendChild(restaurant);
    });

});


// =============================
// REMOVE RESTAURANT
// =============================

let removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let card = button.closest(".restaurant-card");

        card.remove();

    });

});


// =============================
// ORDER NOW BUTTON
// =============================

let orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let restaurantCard = button.closest(".restaurant-card");

        let restaurantName = restaurantCard.querySelector("h2").innerText;

        alert("You are ordering from " + restaurantName);

    });

});
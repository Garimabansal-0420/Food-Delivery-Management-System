
// ==========================================
// FOODIEHUB RESTAURANTS
// ==========================================

const WISHLIST_KEY = "foodiehub_wishlist";

const restaurantContainer =
    document.querySelector("#restaurantContainer");

const restaurantCards = Array.from(
    document.querySelectorAll(".restaurant-card")
);

const originalOrder = [...restaurantCards];

const searchInput = document.querySelector("#searchInput");
const cuisineFilter = document.querySelector("#cuisineFilter");
const ratingFilter = document.querySelector("#ratingFilter");
const timeFilter = document.querySelector("#timeFilter");
const sortFilter = document.querySelector("#sortFilter");

const clearFiltersButton = document.querySelector("#clearFilters");
const loadMoreButton = document.querySelector("#loadMoreBtn");
const resultCount = document.querySelector("#resultCount");
const noResults = document.querySelector("#noResults");
const wishlistCount = document.querySelector("#wishlistCount");

const CARDS_PER_LOAD = 6;

let visibleCount = CARDS_PER_LOAD;


// ==========================================
// 1. GET WISHLIST
// ==========================================

function getWishlist() {
    try {
        const wishlist = JSON.parse(
            localStorage.getItem(WISHLIST_KEY) || "[]"
        );

        return Array.isArray(wishlist) ? wishlist : [];

    } catch (error) {
        console.error("Wishlist reading error:", error);
        return [];
    }
}


// ==========================================
// 2. SAVE WISHLIST
// ==========================================

function saveWishlist(wishlist) {
    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

    updateWishlistCount();
}


// ==========================================
// 3. UPDATE WISHLIST COUNT
// ==========================================

function updateWishlistCount() {
    wishlistCount.textContent = getWishlist().length;
}


// ==========================================
// 4. CREATE RESTAURANT ID
// ==========================================

function createRestaurantId(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}


// ==========================================
// 5. GET RESTAURANT DATA
// ==========================================

function getRestaurantData(card) {

    const name = card.querySelector("h2").textContent.trim();

    const image = card.querySelector("img").getAttribute("src");

    const cuisine = card.dataset.cuisine;

    const rating = Number(card.dataset.rating);

    return {
        id: createRestaurantId(name),
        name: name,
        image: image,
        price: null,
        rating: rating,
        cuisine: cuisine,
        location: ""
    };
}


// ==========================================
// 6. UPDATE HEART BUTTONS
// ==========================================

function updateWishlistButtons() {

    const wishlist = getWishlist();

    restaurantCards.forEach(card => {

        const restaurantName =
            card.querySelector("h2").textContent.trim();

        const heartButton =
            card.querySelector(".wishlist-btn");

        const restaurantId =
            createRestaurantId(restaurantName);

        const isSaved = wishlist.some(restaurant => {
            return restaurant.id === restaurantId;
        });

        heartButton.classList.toggle("selected", isSaved);

        heartButton.textContent = isSaved ? "♥" : "♡";

        heartButton.setAttribute(
            "aria-pressed",
            String(isSaved)
        );

        heartButton.setAttribute(
            "aria-label",
            `${isSaved ? "Remove" : "Add"} ${restaurantName} ${
                isSaved ? "from" : "to"
            } wishlist`
        );
    });

    updateWishlistCount();
}


// ==========================================
// 7. FILTER RESTAURANTS
// ==========================================

function getFilteredRestaurants() {

    const searchText =
        searchInput.value.trim().toLowerCase();

    const selectedCuisine =
        cuisineFilter.value.toLowerCase();

    const minimumRating =
        Number(ratingFilter.value);

    const maximumTime =
        Number(timeFilter.value);

    return restaurantCards.filter(card => {

        const name =
            card.querySelector("h2").textContent.toLowerCase();

        const cuisines =
            card.dataset.cuisine.toLowerCase();

        const rating =
            Number(card.dataset.rating);

        const deliveryTime =
            Number(card.dataset.time);

        const matchesSearch =
            name.includes(searchText);

        const matchesCuisine =
            selectedCuisine === "all" ||
            cuisines.includes(selectedCuisine);

        const matchesRating =
            rating >= minimumRating;

        const matchesTime =
            deliveryTime <= maximumTime;

        return (
            matchesSearch &&
            matchesCuisine &&
            matchesRating &&
            matchesTime
        );
    });
}


// ==========================================
// 8. SORT RESTAURANTS
// ==========================================

function sortRestaurants(cards) {

    const sortValue = sortFilter.value;

    const sortedCards = [...cards];

    if (sortValue === "rating") {

        sortedCards.sort((a, b) =>
            Number(b.dataset.rating) -
            Number(a.dataset.rating)
        );

    } else if (sortValue === "time") {

        sortedCards.sort((a, b) =>
            Number(a.dataset.time) -
            Number(b.dataset.time)
        );

    } else if (sortValue === "name") {

        sortedCards.sort((a, b) => {

            const nameA =
                a.querySelector("h2").textContent.trim();

            const nameB =
                b.querySelector("h2").textContent.trim();

            return nameA.localeCompare(nameB);
        });

    } else {

        sortedCards.sort((a, b) =>
            originalOrder.indexOf(a) -
            originalOrder.indexOf(b)
        );
    }

    return sortedCards;
}


// ==========================================
// 9. DISPLAY RESTAURANTS
// ==========================================

function displayRestaurants() {

    const filteredCards = getFilteredRestaurants();

    const sortedCards = sortRestaurants(filteredCards);

    restaurantCards.forEach(card => {
        card.style.display = "none";
    });

    sortedCards.forEach((card, index) => {

        restaurantContainer.appendChild(card);

        if (index < visibleCount) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });

    const currentlyShowing =
        Math.min(visibleCount, sortedCards.length);

    resultCount.textContent =
        `Showing ${currentlyShowing} of ${sortedCards.length} restaurants`;

    noResults.hidden = sortedCards.length !== 0;

    loadMoreButton.hidden =
        visibleCount >= sortedCards.length;
}


// ==========================================
// 10. FILTER EVENTS
// ==========================================

function handleFilterChange() {

    visibleCount = CARDS_PER_LOAD;

    displayRestaurants();
}

searchInput.addEventListener("input", handleFilterChange);

cuisineFilter.addEventListener("change", handleFilterChange);

ratingFilter.addEventListener("change", handleFilterChange);

timeFilter.addEventListener("change", handleFilterChange);

sortFilter.addEventListener("change", handleFilterChange);


// ==========================================
// 11. CLEAR FILTERS
// ==========================================

clearFiltersButton.addEventListener("click", () => {

    searchInput.value = "";

    cuisineFilter.value = "all";

    ratingFilter.value = "0";

    timeFilter.value = "60";

    sortFilter.value = "default";

    visibleCount = CARDS_PER_LOAD;

    displayRestaurants();
});


// ==========================================
// 12. LOAD MORE
// ==========================================

loadMoreButton.addEventListener("click", () => {

    visibleCount += CARDS_PER_LOAD;

    displayRestaurants();
});


// ==========================================
// 13. WISHLIST HEART BUTTON
// ==========================================

restaurantContainer.addEventListener("click", event => {

    const heartButton =
        event.target.closest(".wishlist-btn");

    if (!heartButton) {
        return;
    }

    const card =
        heartButton.closest(".restaurant-card");

    const restaurant =
        getRestaurantData(card);

    let wishlist = getWishlist();

    const isAlreadySaved = wishlist.some(item => {
        return item.id === restaurant.id;
    });

    if (isAlreadySaved) {

        wishlist = wishlist.filter(item => {
            return item.id !== restaurant.id;
        });

    } else {

        wishlist.push(restaurant);
    }

    saveWishlist(wishlist);

    updateWishlistButtons();
});


// ==========================================
// 14. SYNC WHEN ANOTHER TAB CHANGES WISHLIST
// ==========================================

window.addEventListener("storage", event => {

    if (event.key === WISHLIST_KEY) {
        updateWishlistButtons();
    }
});


// ==========================================
// 15. INITIALIZE
// ==========================================

updateWishlistButtons();

displayRestaurants();


// ==========================================
// VISIT RESTAURANT
// ==========================================

restaurantContainer.addEventListener("click", event => {

    const visitButton = event.target.closest(".visit");

    if (!visitButton) {
        return;
    }

    const card = visitButton.closest(".restaurant-card");

    const restaurant = getRestaurantData(card);

    localStorage.setItem(
        "foodiehub_selected_restaurant",
        JSON.stringify(restaurant)
    );

    window.location.href = "../HTML/menu.html";
});
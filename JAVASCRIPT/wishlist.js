


const WISHLIST_KEY = "foodiehub_wishlist";
const SELECTED_RESTAURANT_KEY = "foodiehub_selected_restaurant";

const restaurantGrid =
    document.querySelector("#wishlist-container");

const sortSelect =
    document.querySelector(".sort-select");




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




function saveWishlist(wishlist) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

    renderWishlist();
}



function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>'"]/g, character => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"

    }[character]));
}



function renderWishlist() {

    const wishlist = getWishlist();

    if (wishlist.length === 0) {

        restaurantGrid.innerHTML = `
            <div class="empty-wishlist">
                <h2>❤️ Your Wishlist is Empty</h2>

                <p>
                    You haven't saved any favourite restaurants yet.
                </p>

                <a href="restaurants.html">
                    Explore Restaurants
                </a>
            </div>
        `;

        return;
    }

    restaurantGrid.innerHTML = wishlist.map(restaurant => {

        const priceText =
            restaurant.price == null
                ? "Price unavailable"
                : `ITEMS AT ₹${restaurant.price}`;

        const locationText =
            restaurant.location || "Location not specified";

        return `
            <div class="restaurant-card"
                 data-id="${escapeHTML(restaurant.id)}"
                 data-rating="${Number(restaurant.rating) || 0}"
                 data-price="${Number(restaurant.price) || 0}">

                <div class="restaurant-image">

                    <img
                        src="${escapeHTML(restaurant.image)}"
                        alt="${escapeHTML(restaurant.name)}"
                    >

                    <div class="price-overlay">
                        ${escapeHTML(priceText)}
                    </div>

                </div>

                <div class="restaurant-info">

                    <h2>${escapeHTML(restaurant.name)}</h2>

                    <div class="rating">
                        <span class="star">★</span>
                        <span>${escapeHTML(restaurant.rating)}</span>
                    </div>

                    <p>${escapeHTML(restaurant.cuisine)}</p>

                    <p>${escapeHTML(locationText)}</p>

                    <div class="restaurant-buttons">

                        <button class="order-btn" type="button">
                            Order Now
                        </button>

                        <button
                            class="remove-btn"
                            type="button"
                            data-id="${escapeHTML(restaurant.id)}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");

    sortRestaurants();
}


function removeRestaurant(id) {

    const wishlist = getWishlist();

    const updatedWishlist = wishlist.filter(restaurant => {

        return String(restaurant.id) !== String(id);
    });

    saveWishlist(updatedWishlist);
}




function sortRestaurants() {

    const cards = Array.from(
        restaurantGrid.querySelectorAll(".restaurant-card")
    );

    const selectedOption = sortSelect.value;

    cards.sort((a, b) => {

        const nameA =
            a.querySelector("h2").textContent.toLowerCase();

        const nameB =
            b.querySelector("h2").textContent.toLowerCase();

        const ratingA =
            Number(a.dataset.rating);

        const ratingB =
            Number(b.dataset.rating);

        const priceA =
            Number(a.dataset.price);

        const priceB =
            Number(b.dataset.price);

        switch (selectedOption) {

            case "Rating: High to Low":
                return ratingB - ratingA;

            case "Rating: Low to High":
                return ratingA - ratingB;

            case "Name: A to Z":
                return nameA.localeCompare(nameB);

            case "Name: Z to A":
                return nameB.localeCompare(nameA);

            case "Price: Low to High":
                return priceA - priceB;

            case "Price: High to Low":
                return priceB - priceA;

            default:
                return 0;
        }
    });

    cards.forEach(card => {
        restaurantGrid.appendChild(card);
    });
}



restaurantGrid.addEventListener("click", event => {

    

    const removeButton =
        event.target.closest(".remove-btn");

    if (removeButton) {

        const id = removeButton.dataset.id;

        removeRestaurant(id);

        return;
    }


    
    const orderButton =
        event.target.closest(".order-btn");

    if (orderButton) {

        const card =
            orderButton.closest(".restaurant-card");

        const restaurantId = card.dataset.id;

        const wishlist = getWishlist();

        const selectedRestaurant = wishlist.find(restaurant => {

            return String(restaurant.id) === String(restaurantId);

        });

        if (!selectedRestaurant) {

            alert("Restaurant not found in Wishlist!");

            return;
        }

        

        localStorage.setItem(
            SELECTED_RESTAURANT_KEY,
            JSON.stringify(selectedRestaurant)
        );

       

        window.location.href = "menu.html";
    }
});




sortSelect.addEventListener("change", sortRestaurants);




window.addEventListener("storage", event => {

    if (event.key === WISHLIST_KEY) {
        renderWishlist();
    }
});




renderWishlist();

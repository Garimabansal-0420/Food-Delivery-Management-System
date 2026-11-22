
// =====================================
// FOODIEHUB FOOD DETAILS FUNCTIONALITY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // CART FUNCTIONALITY
    // =====================================

    const foodCards = document.querySelectorAll(".food-card");
    const cartMessage = document.querySelector(".cart-message");
    const viewCartBtn = document.querySelector(".view-cart");

    const RESTAURANT_NAME = "Dum Safar Biryani";


    // Generate a stable ID for each food item

    function getFoodId(card, foodName) {

        return card.dataset.cartId ||
            "food-details-" + foodName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

    }


    // Get quantity of a particular food item

    function getFoodQuantity(foodId) {

        const cart = FoodieHubCart.get();

        const item = cart.find(function (item) {
            return item.id === foodId;
        });

        return item ? item.quantity : 0;

    }


    // =====================================
    // UPDATE FOOD BUTTONS
    // =====================================

    function updateFoodButtons() {

        foodCards.forEach(function (card) {

            const foodName =
                card.querySelector("h3").innerText.trim();

            const button =
                card.querySelector(".add-button");

            const foodId =
                getFoodId(card, foodName);

            const quantity =
                getFoodQuantity(foodId);

            if (quantity > 0) {

                button.innerText = "-  " + quantity + "  +";

            } else {

                button.innerText = "ADD";

            }

        });

    }


    // =====================================
    // UPDATE CART BAR
    // =====================================

    function updateCart() {

        const cart = FoodieHubCart.get();

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(function (item) {

            totalItems += Number(item.quantity || 0);

            totalPrice +=
                Number(item.price || 0) *
                Number(item.quantity || 0);

        });


        if (!cartMessage) return;


        if (totalItems === 0) {

            cartMessage.innerHTML = `
                <h3>Hungry for biryani?</h3>
                <p>Add your favorite dishes to your order</p>
            `;

        } else {

            cartMessage.innerHTML = `
                <h3>${totalItems} Item(s) Added</h3>
                <p>Total Amount: ₹${totalPrice}</p>
            `;

        }

    }


    // =====================================
    // ADD AND REMOVE FOOD
    // =====================================

    foodCards.forEach(function (card) {

        const addButton =
            card.querySelector(".add-button");

        const foodName =
            card.querySelector("h3").innerText.trim();

        const foodPrice = Number(
            card.querySelector("h4").innerText.replace(/[^\d.]/g, "")
        );

        const foodId =
            getFoodId(card, foodName);


        addButton.addEventListener("click", function (event) {

            const quantity =
                getFoodQuantity(foodId);


            // If item is not in cart, add it

            if (quantity === 0) {

                FoodieHubCart.add({

                    id: foodId,
                    name: foodName,
                    price: foodPrice,
                    source: "food-details",
                    restaurant: RESTAURANT_NAME

                });

            } else {

                // Check which side of button was clicked

                const buttonRect =
                    addButton.getBoundingClientRect();

                const clickPosition =
                    event.clientX - buttonRect.left;


                if (clickPosition < buttonRect.width / 2) {

                    // Left side: decrease quantity

                    FoodieHubCart.removeOne(foodId);

                } else {

                    // Right side: increase quantity

                    FoodieHubCart.add({

                        id: foodId,
                        name: foodName,
                        price: foodPrice,
                        source: "food-details",
                        restaurant: RESTAURANT_NAME

                    });

                }

            }

            updateFoodButtons();
            updateCart();

        });

    });


    // =====================================
    // VIEW CART
    // =====================================

    if (viewCartBtn) {

        viewCartBtn.addEventListener("click", function () {

            const cart = FoodieHubCart.get();

            if (cart.length === 0) {

                alert(
                    "Your cart is empty! Please add some food first."
                );

                return;

            }

            window.location.href = "cart.html";

        });

    }


    // =====================================
    // LISTEN FOR CART CHANGES
    // =====================================

    window.addEventListener("foodiehub:cart-updated", function () {

        updateFoodButtons();
        updateCart();

    });


    // Update if cart changes in another browser tab

    window.addEventListener("storage", function (event) {

        if (event.key === "foodiehub_cart") {

            updateFoodButtons();
            updateCart();

        }

    });


    // Initial cart display

    updateFoodButtons();
    updateCart();


    // =====================================
    // WRITE AND POST REVIEW FUNCTIONALITY
    // =====================================

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewsSection =
        document.querySelector(".reviews-section");

    if (reviewForm && reviewsSection) {

        reviewForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // Get user input

            const name =
                document.getElementById("reviewerName").value.trim();

            const rating =
                document.getElementById("reviewRating").value;

            const reviewText =
                document.getElementById("reviewText").value.trim();


            // Validate input

            if (name === "" || rating === "" || reviewText === "") {

                alert("Please fill all the fields!");

                return;

            }


            // CREATE REVIEW CARD

            const reviewCard =
                document.createElement("div");

            reviewCard.className = "review-card";


            // REVIEW HEADER

            const reviewTop =
                document.createElement("div");

            reviewTop.className = "review-top";


            // USER DETAILS

            const reviewUser =
                document.createElement("div");

            reviewUser.className = "review-user";


            // PROFILE CIRCLE

            const profileCircle =
                document.createElement("div");

            profileCircle.className = "profile-circle";

            profileCircle.textContent =
                name.charAt(0).toUpperCase();


            // USER INFORMATION

            const userInfo =
                document.createElement("div");

            const userName =
                document.createElement("b");

            userName.textContent = name;

            const userType =
                document.createElement("span");

            userType.textContent = "Customer";


            userInfo.appendChild(userName);
            userInfo.appendChild(userType);


            // ADD USER DETAILS

            reviewUser.appendChild(profileCircle);
            reviewUser.appendChild(userInfo);


            // REVIEW RATING

            const reviewRating =
                document.createElement("div");

            reviewRating.className = "review-rating";

            reviewRating.textContent =
                "★ " + rating + ".0";


            // REVIEW DESCRIPTION

            const reviewDescription =
                document.createElement("p");

            reviewDescription.textContent =
                '"' + reviewText + '"';


            // BUILD REVIEW CARD

            reviewTop.appendChild(reviewUser);
            reviewTop.appendChild(reviewRating);

            reviewCard.appendChild(reviewTop);
            reviewCard.appendChild(reviewDescription);


            // ADD REVIEW TO PAGE

            const writeReview =
                document.querySelector(".write-review");

            if (writeReview) {

                reviewsSection.insertBefore(
                    reviewCard,
                    writeReview
                );

            } else {

                reviewsSection.appendChild(reviewCard);

            }


            // RESET FORM

            reviewForm.reset();


            // SUCCESS MESSAGE

            alert("Your review has been posted successfully!");

        });

    }

});

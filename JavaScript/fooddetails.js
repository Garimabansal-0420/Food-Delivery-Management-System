
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // CART FUNCTIONALITY
    // =====================================

    const foodCards = document.querySelectorAll(".food-card");
    const cartMessage = document.querySelector(".cart-message");
    const viewCartBtn = document.querySelector(".view-cart");

    let cart = [];

    // ADD FOOD AND MANAGE QUANTITY
    foodCards.forEach(function (card) {

        const addButton = card.querySelector(".add-button");

        const foodName = card.querySelector("h3").innerText;

        const foodPrice = parseInt(
            card.querySelector("h4").innerText.replace("₹", "")
        );

        addButton.addEventListener("click", function (event) {

            let existingItem = cart.find(function (item) {
                return item.name === foodName;
            });

            if (!existingItem) {

                // Add item for the first time
                cart.push({
                    name: foodName,
                    price: foodPrice,
                    quantity: 1
                });

            } else {

                // Check which side of button was clicked
                const buttonRect = addButton.getBoundingClientRect();

                const clickPosition = event.clientX - buttonRect.left;

                if (clickPosition < buttonRect.width / 2) {

                    // Decrease quantity
                    existingItem.quantity--;

                    if (existingItem.quantity === 0) {

                        cart = cart.filter(function (item) {
                            return item.name !== foodName;
                        });

                    }

                } else {

                    // Increase quantity
                    existingItem.quantity++;

                }

            }

            updateCart();
            updateFoodButtons();

        });

    });


    // UPDATE ADD BUTTONS
    function updateFoodButtons() {

        foodCards.forEach(function (card) {

            const foodName = card.querySelector("h3").innerText;

            const button = card.querySelector(".add-button");

            const item = cart.find(function (item) {
                return item.name === foodName;
            });

            if (item) {
                button.innerText = "-  " + item.quantity + "  +";
            } else {
                button.innerText = "ADD";
            }

        });

    }


    // UPDATE CART BAR
    function updateCart() {

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(function (item) {

            totalItems += item.quantity;

            totalPrice += item.price * item.quantity;

        });

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


    // VIEW CART
    viewCartBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty! Please add some food first.");

            return;

        }

        let cartDetails = "YOUR FOODIEHUB CART\n\n";

        let totalPrice = 0;

        cart.forEach(function (item) {

            const itemTotal = item.price * item.quantity;

            cartDetails +=
                item.name + "\n" +
                "₹" + item.price + " x " + item.quantity +
                " = ₹" + itemTotal + "\n\n";

            totalPrice += itemTotal;

        });

        cartDetails += "----------------------\n";

        cartDetails += "Total Amount: ₹" + totalPrice;

        alert(cartDetails);

    });



    // =====================================
    // WRITE AND POST REVIEW FUNCTIONALITY
    // =====================================

    const reviewForm = document.getElementById("reviewForm");

    const reviewsSection = document.querySelector(".reviews-section");

    if (reviewForm && reviewsSection) {

        reviewForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Get user input
            const name = document.getElementById("reviewerName").value.trim();

            const rating = document.getElementById("reviewRating").value;

            const reviewText = document.getElementById("reviewText").value.trim();


            // Validate input
            if (name === "" || rating === "" || reviewText === "") {

                alert("Please fill all the fields!");

                return;

            }


            // CREATE REVIEW CARD
            const reviewCard = document.createElement("div");

            reviewCard.className = "review-card";


            // REVIEW HEADER
            const reviewTop = document.createElement("div");

            reviewTop.className = "review-top";


            // USER DETAILS
            const reviewUser = document.createElement("div");

            reviewUser.className = "review-user";


            // PROFILE CIRCLE
            const profileCircle = document.createElement("div");

            profileCircle.className = "profile-circle";

            profileCircle.textContent = name.charAt(0).toUpperCase();


            // USER INFORMATION
            const userInfo = document.createElement("div");

            const userName = document.createElement("b");

            userName.textContent = name;

            const userType = document.createElement("span");

            userType.textContent = "Customer";


            userInfo.appendChild(userName);

            userInfo.appendChild(userType);


            // ADD USER DETAILS
            reviewUser.appendChild(profileCircle);

            reviewUser.appendChild(userInfo);


            // REVIEW RATING
            const reviewRating = document.createElement("div");

            reviewRating.className = "review-rating";

            reviewRating.textContent = "★ " + rating + ".0";


            // REVIEW DESCRIPTION
            const reviewDescription = document.createElement("p");

            reviewDescription.textContent = '"' + reviewText + '"';


            // BUILD REVIEW CARD
            reviewTop.appendChild(reviewUser);

            reviewTop.appendChild(reviewRating);

            reviewCard.appendChild(reviewTop);

            reviewCard.appendChild(reviewDescription);


            // ADD REVIEW TO PAGE
            const writeReview = document.querySelector(".write-review");

            if (writeReview) {

                reviewsSection.insertBefore(reviewCard, writeReview);

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

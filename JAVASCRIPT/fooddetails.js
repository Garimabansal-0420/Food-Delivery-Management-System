


document.addEventListener("DOMContentLoaded", function () {

    

    const foodCards = document.querySelectorAll(".food-card");
    const cartMessage = document.querySelector(".cart-message");
    const viewCartBtn = document.querySelector(".view-cart");

    const RESTAURANT_NAME = "Dum Safar Biryani";


    

    function getFoodId(card, foodName) {

        return card.dataset.cartId ||
            "food-details-" + foodName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

    }


    

    function getFoodQuantity(foodId) {

        const cart = FoodieHubCart.get();

        const item = cart.find(function (item) {
            return item.id === foodId;
        });

        return item ? item.quantity : 0;

    }


    

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


            

            if (quantity === 0) {

                FoodieHubCart.add({

                    id: foodId,
                    name: foodName,
                    price: foodPrice,
                    source: "food-details",
                    restaurant: RESTAURANT_NAME

                });

            } else {

                

                const buttonRect =
                    addButton.getBoundingClientRect();

                const clickPosition =
                    event.clientX - buttonRect.left;


                if (clickPosition < buttonRect.width / 2) {

                    

                    FoodieHubCart.removeOne(foodId);

                } else {

                    

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



    window.addEventListener("foodiehub:cart-updated", function () {

        updateFoodButtons();
        updateCart();

    });


    

    window.addEventListener("storage", function (event) {

        if (event.key === "foodiehub_cart") {

            updateFoodButtons();
            updateCart();

        }

    });


    

    updateFoodButtons();
    updateCart();


   

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewsSection =
        document.querySelector(".reviews-section");

    if (reviewForm && reviewsSection) {

        reviewForm.addEventListener("submit", function (event) {

            event.preventDefault();


           

            const name =
                document.getElementById("reviewerName").value.trim();

            const rating =
                document.getElementById("reviewRating").value;

            const reviewText =
                document.getElementById("reviewText").value.trim();


            

            if (name === "" || rating === "" || reviewText === "") {

                alert("Please fill all the fields!");

                return;

            }


            

            const reviewCard =
                document.createElement("div");

            reviewCard.className = "review-card";


            

            const reviewTop =
                document.createElement("div");

            reviewTop.className = "review-top";


            

            const reviewUser =
                document.createElement("div");

            reviewUser.className = "review-user";


            

            const profileCircle =
                document.createElement("div");

            profileCircle.className = "profile-circle";

            profileCircle.textContent =
                name.charAt(0).toUpperCase();


            

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


            

            reviewUser.appendChild(profileCircle);
            reviewUser.appendChild(userInfo);


            

            const reviewRating =
                document.createElement("div");

            reviewRating.className = "review-rating";

            reviewRating.textContent =
                "★ " + rating + ".0";


            

            const reviewDescription =
                document.createElement("p");

            reviewDescription.textContent =
                '"' + reviewText + '"';


            

            reviewTop.appendChild(reviewUser);
            reviewTop.appendChild(reviewRating);

            reviewCard.appendChild(reviewTop);
            reviewCard.appendChild(reviewDescription);


            

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


            

            reviewForm.reset();


            

            alert("Your review has been posted successfully!");

        });

    }

});

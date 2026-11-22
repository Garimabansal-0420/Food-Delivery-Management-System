// ========================================
// FOOD EXPRESS - DYNAMIC ORDER TRACKING
// HTML + CSS + JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. SELECT HTML ELEMENTS
    // ========================================

    const statusBadge = document.querySelector(".status-badge");
    const trackingHeading = document.querySelector(".section-heading h2");
    const progressFill = document.querySelector(".progress-filled");

    const progressSteps = document.querySelectorAll(".progress-step");
    const timelineItems = document.querySelectorAll(".timeline-item");

    const etaTitle = document.querySelector(".eta-card h3");
    const etaDescription = document.querySelector(".eta-card p");

    const foodItems = document.querySelectorAll(".food-item");

    // ========================================
    // 2. ORDER STATUS DATA
    // ========================================

    const statuses = [
        {
            badge: "Order Confirmed",
            heading: "Your order is confirmed",
            eta: "30 - 35 min",
            message: "Restaurant has received your order."
        },
        {
            badge: "Preparing Food",
            heading: "Your food is being prepared",
            eta: "25 - 30 min",
            message: "The restaurant is preparing your food."
        },
        {
            badge: "On the Way",
            heading: "Your food is on the way",
            eta: "10 - 15 min",
            message: "Your delivery partner is bringing your order."
        },
        {
            badge: "Delivered",
            heading: "Your order has been delivered!",
            eta: "Delivered",
            message: "Enjoy your delicious meal!"
        }
    ];

    // Initial status: Preparing Food
    let currentStatus = 1;

    // ========================================
    // 3. ADD STATUS CONTROL BUTTONS
    // ========================================

    const controls = document.createElement("div");

    controls.style.display = "flex";
    controls.style.gap = "10px";
    controls.style.flexWrap = "wrap";
    controls.style.marginTop = "20px";

    controls.innerHTML = `
        <button id="nextStatus"
        style="padding:12px 18px; background:#ed6b35;
        color:white; border:none; border-radius:8px; cursor:pointer;">
            Update Demo Status
        </button>

        <button id="resetStatus"
        style="padding:12px 18px; background:#fff0e8;
        color:#ed6b35; border:none; border-radius:8px; cursor:pointer;">
            Reset Status
        </button>
    `;

    document.querySelector(".tracking-card").appendChild(controls);

    // ========================================
    // 4. UPDATE ORDER STATUS
    // ========================================

    function updateStatus() {

        const status = statuses[currentStatus];

        // Update status badge
        statusBadge.innerHTML = `
            <span class="status-dot"></span>
            ${status.badge}
        `;

        // Update main heading
        trackingHeading.textContent = status.heading;

        // Update ETA
        etaTitle.textContent = status.eta;
        etaDescription.textContent = status.message;

        // Update progress bar
        progressFill.style.width =
            (currentStatus / 3) * 100 + "%";

        // Update progress steps
        progressSteps.forEach(function (step, index) {

            step.classList.remove(
                "completed", "active", "pending"
            );

            if (index < currentStatus) {
                step.classList.add("completed");
            }
            else if (index === currentStatus) {
                step.classList.add("active");
            }
            else {
                step.classList.add("pending");
            }

        });

        // Update timeline
        timelineItems.forEach(function (item, index) {

            item.classList.remove(
                "completed", "active", "pending"
            );

            const description =
                item.querySelector(".timeline-content p");

            const time =
                item.querySelector(".timeline-content span");

            if (index < currentStatus) {

                item.classList.add("completed");
                time.textContent = "Completed";

            }
            else if (index === currentStatus) {

                item.classList.add("active");
                time.textContent = "In Progress";

                description.textContent = status.message;

            }
            else {

                item.classList.add("pending");
                time.textContent = "Pending";

            }

        });

        // Disable button after delivery
        document.querySelector("#nextStatus").disabled =
            currentStatus === 3;

        if (currentStatus === 3) {

            document.querySelector("#nextStatus").textContent =
                "Order Delivered";

            document.querySelector(".meal-message").textContent =
                "🎉 Order Delivered! Enjoy Your Meal! 😋";

        }
        else {

            document.querySelector("#nextStatus").textContent =
                "Update Demo Status";

            document.querySelector(".meal-message").textContent =
                "🍽️ Enjoy Your Meal! 😋";

        }

    }

    // Next status button
    document.querySelector("#nextStatus").addEventListener(
        "click", function () {

            if (currentStatus < 3) {
                currentStatus++;
                updateStatus();
            }

        }
    );

    // Reset status button
    document.querySelector("#resetStatus").addEventListener(
        "click", function () {

            currentStatus = 1;
            updateStatus();

        }
    );

    updateStatus();


    // ========================================
    // 5. DYNAMIC FOOD QUANTITY AND PRICE
    // ========================================

    let totalAmount = 0;

    foodItems.forEach(function (item) {

        const priceElement =
            item.querySelector(":scope > strong");

        const quantityElement =
            item.querySelector(".food-details span");

        const originalPrice = Number(
            priceElement.textContent.replace(/[^\d]/g, "")
        );

        let quantity = 1;

        // Save original price and quantity
        item.dataset.price = originalPrice;

        // Create quantity buttons
        const quantityControls = document.createElement("div");

        quantityControls.innerHTML = `
            <button class="decrease">-</button>

            <strong class="quantity">${quantity}</strong>

            <button class="increase">+</button>

            <button class="remove">Remove</button>
        `;

        quantityControls.style.display = "flex";
        quantityControls.style.alignItems = "center";
        quantityControls.style.gap = "10px";
        quantityControls.style.marginTop = "10px";

        item.querySelector(".food-details").appendChild(
            quantityControls
        );

        const decreaseButton =
            quantityControls.querySelector(".decrease");

        const increaseButton =
            quantityControls.querySelector(".increase");

        const removeButton =
            quantityControls.querySelector(".remove");

        const quantityText =
            quantityControls.querySelector(".quantity");

        // Update item price
        function updateItem() {

            quantityText.textContent = quantity;

            quantityElement.textContent = "Qty: " + quantity;

            priceElement.textContent =
                "₹" + (originalPrice * quantity);

            updateBill();

        }

        // Increase quantity
        increaseButton.addEventListener("click", function () {

            quantity++;

            updateItem();

        });

        // Decrease quantity
        decreaseButton.addEventListener("click", function () {

            if (quantity > 1) {

                quantity--;

                updateItem();

            }

        });

        // Remove item
        removeButton.addEventListener("click", function () {

            quantity = 0;

            item.style.display = "none";

            updateBill();

        });

        // Save function for reorder
        item.updateItem = function (newQuantity) {

            quantity = newQuantity;

            item.style.display = "flex";

            updateItem();

        };

    });


    // ========================================
    // 6. CALCULATE TOTAL BILL
    // ========================================


function updateBill() {

    totalAmount = 0;

    let totalItems = 0;

    foodItems.forEach(function (item) {

        // Ignore removed/hidden items
        if (item.style.display === "none") {
            return;
        }

        const quantityText = item.querySelector(".quantity");

        const quantity = Number(quantityText.textContent);

        const price = Number(item.dataset.price);

        totalAmount += price * quantity;

        totalItems += quantity;

    });

    // Update item count
    document.querySelector(".item-count").textContent =
        totalItems + " Items";

    // Update payment amount
    document.querySelector(".payment-card h3").textContent =
        "₹" + totalAmount;

    // Update bill summary
    document.querySelector(".bill-row span:last-child").textContent =
        "₹" + totalAmount;

    document.querySelector(".bill-total strong").textContent =
        "₹" + totalAmount;

}


    // ========================================
    // 7. FAVORITE BUTTON
    // ========================================

    const favoriteButton =
        document.querySelectorAll(".hero-actions .icon-btn")[0];

    let isFavorite = false;

    favoriteButton.addEventListener("click", function () {

        isFavorite = !isFavorite;

        if (isFavorite) {

            favoriteButton.textContent = "♥";
            favoriteButton.style.color = "red";

        }
        else {

            favoriteButton.textContent = "♡";
            favoriteButton.style.color = "white";

        }

    });


    // ========================================
    // 8. MODAL FUNCTION
    // ========================================

    function showModal(title, message) {

        const oldModal = document.querySelector(".custom-modal");

        if (oldModal) {
            oldModal.remove();
        }

        const modal = document.createElement("div");

        modal.className = "custom-modal";

        modal.style.position = "fixed";
        modal.style.inset = "0";
        modal.style.background = "rgba(0,0,0,0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "9999";
        modal.style.padding = "20px";

        modal.innerHTML = `
            <div style="
                background:white;
                padding:25px;
                border-radius:15px;
                max-width:420px;
                width:100%;
            ">

                <button class="closeModal"
                style="float:right; cursor:pointer;">
                    ✖
                </button>

                <h2>${title}</h2>

                <div class="modalMessage">
                    ${message}
                </div>

            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".closeModal").addEventListener(
            "click", function () {
                modal.remove();
            }
        );

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                modal.remove();
            }

        });

    }


    // ========================================
    // 9. VIEW ORDER DETAILS
    // ========================================

    document.querySelector(".secondary-btn").addEventListener(
        "click", function () {

            let orderDetails = "";

            foodItems.forEach(function (item) {

                const quantity = Number(
                    item.querySelector(".quantity").textContent
                );

                if (quantity > 0) {

                    const name =
                        item.querySelector(".food-details h3").textContent;

                    const price =
                        Number(item.dataset.price) * quantity;

                    orderDetails += `
                        <p>
                            ${name} × ${quantity}
                            - ₹${price}
                        </p>
                    `;

                }

            });

            showModal(
                "Your Order Details",
                `
                    <p>Order ID: #FD10245</p>
                    <p>Restaurant: Spice Kitchen</p>
                    <hr>
                    ${orderDetails}
                    <hr>
                    <h3>Total: ₹${totalAmount}</h3>
                `
            );

        }
    );


    // ========================================
    // 10. REORDER FOOD
    // ========================================

   
document.querySelector(".primary-btn").addEventListener(
    "click",
    function () {

        foodItems.forEach(function (item) {

            // Restore only removed food items
            if (item.style.display === "none") {
                item.updateItem(1);
            }

        });

        // Recalculate total using current quantities
        updateBill();

        currentStatus = 0;
        updateStatus();

        showModal(
            "Reorder Successful",
            `
                <p>Your food items have been restored.</p>
                <p>Total Amount: ₹${totalAmount}</p>
                <p>This is a frontend demo. No real order has been placed.</p>
            `
        );

    }
);



    // ========================================
    // 11. GET HELP BUTTON
    // ========================================

    document.querySelector(".help-btn").addEventListener(
        "click", function () {

            showModal(
                "FoodExpress Support",
                `
                    <p>How can we help you?</p>

                    <p>1. Order is delayed</p>
                    <p>2. Missing food item</p>
                    <p>3. Wrong order received</p>
                    <p>4. Payment issue</p>
                `
            );

        }
    );


    // ========================================
    // 12. RIDER CALL BUTTON
    // ========================================

    const riderButtons =
        document.querySelectorAll(".round-action");

    riderButtons[0].addEventListener("click", function () {

        showModal(
            "Call Delivery Partner",
            `
                <p>Rider Name: Rohit Kumar</p>
                <p>Phone number is not configured in this demo.</p>
            `
        );

    });


    // ========================================
    // 13. RIDER CHAT BUTTON
    // ========================================

    riderButtons[1].addEventListener("click", function () {

        showModal(
            "Chat with Rider",
            `
                <div id="chatMessages">
                    <p><strong>Rohit:</strong> Hello! I am on my way.</p>
                </div>

                <input type="text"
                id="chatInput"
                placeholder="Enter your message"
                style="padding:10px; width:65%;">

                <button id="sendMessage">Send</button>
            `
        );

        document.querySelector("#sendMessage").addEventListener(
            "click", function () {

                const input =
                    document.querySelector("#chatInput");

                const message = input.value.trim();

                if (message !== "") {

                    const newMessage =
                        document.createElement("p");

                    newMessage.textContent = "You: " + message;

                    document.querySelector("#chatMessages").appendChild(
                        newMessage
                    );

                    input.value = "";

                }

            }
        );

    });


    // ========================================
    // 14. MORE OPTIONS BUTTON
    // ========================================

    const moreButton =
        document.querySelectorAll(".hero-actions .icon-btn")[1];

    moreButton.addEventListener("click", function () {

        showModal(
            "More Options",
            `
                <p>Order ID: #FD10245</p>
                <p>Restaurant: Spice Kitchen</p>
                <p>Payment: Paid Online</p>
            `
        );

    });


    // ========================================
    // 15. BACK BUTTON
    // ========================================

    document.querySelector(".hero-top > .icon-btn")
        .addEventListener("click", function () {

            if (history.length > 1) {

                history.back();

            }
            else {

                showModal(
                    "FoodExpress",
                    "<p>You are on the Order Tracking page.</p>"
                );

            }

        });


    console.log("FoodExpress JavaScript Loaded Successfully!");

});
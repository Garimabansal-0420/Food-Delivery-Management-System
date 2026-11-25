


document.addEventListener("DOMContentLoaded", () => {

    

    const ORDER_STORAGE_KEY = "foodiehub_orders";
    const CURRENT_ORDER_KEY = "foodiehub_current_order_id";
    const BOOKING_STORAGE_KEY = "foodiehub_bookings";

    

    const restaurantName = document.querySelector(".restaurant-info h2");
    const orderIdElement = document.querySelector(".order-number strong");

    const statusHeading = document.querySelector(".status-top h2");
    const statusDescription = document.querySelector(".status-top p");

    const progressFill = document.querySelector(".progress-fill");
    const progressItems = document.querySelectorAll(".progress-item");
    const timelineItems = document.querySelectorAll(".timeline-item");

    const etaHeading = document.querySelector(".eta-card h2");
    const etaMessage = document.querySelector(".eta-card p");

    const deliveryStatusHeading = document.querySelector(
        ".delivery-card .card-heading h2"
    );

    const summaryCard = document.querySelector(".summary-card");
    const bookingHistoryList = document.getElementById("bookingHistoryList");

    const callButton = document.getElementById("callPartner");
    const detailsButton = document.getElementById("viewOrderDetails");

    let currentOrder = null;
    let currentStatus = 0;

   

    const statuses = [
        {
            heading: "Order Confirmed",
            icon: "fa-circle-check",
            message: "Restaurant has received your order.",
            eta: "30–35 min",
            etaMessage: "Your order has been confirmed."
        },
        {
            heading: "Preparing Food",
            icon: "fa-fire",
            message: "The restaurant is preparing your delicious food.",
            eta: "25–30 min",
            etaMessage: "Your food is being freshly prepared."
        },
        {
            heading: "On The Way",
            icon: "fa-motorcycle",
            message: "Your delivery partner is bringing your order.",
            eta: "10–15 min",
            etaMessage: "Your order is out for delivery."
        },
        {
            heading: "Delivered",
            icon: "fa-house",
            message: "Your order has been delivered. Enjoy your meal!",
            eta: "Delivered",
            etaMessage: "Your food has reached your doorstep."
        }
    ];

   

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>'"]/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        }[character]));
    }

    function formatCurrency(value) {
        return "₹" + Number(value || 0).toLocaleString("en-IN");
    }

    function getOrders() {
        try {
            const orders = JSON.parse(
                localStorage.getItem(ORDER_STORAGE_KEY) || "[]"
            );

            return Array.isArray(orders) ? orders : [];

        } catch (error) {
            console.error("Error reading orders:", error);
            return [];
        }
    }

    function getCurrentOrder() {
        const orders = getOrders();
        const savedOrderId = localStorage.getItem(CURRENT_ORDER_KEY);

        if (savedOrderId) {
            const selectedOrder = orders.find(order =>
                String(order.orderId) === String(savedOrderId)
            );

            if (selectedOrder) return selectedOrder;
        }

        return orders.length ? orders[orders.length - 1] : null;
    }

    function getStatusIndex(status) {
        const value = String(status || "Confirmed").toLowerCase();

        if (value.includes("deliver")) return 3;
        if (value.includes("way") || value.includes("out")) return 2;
        if (value.includes("prepar")) return 1;

        return 0;
    }

 

    function prepareSummaryArea() {

        if (!summaryCard) return;

        
        summaryCard.querySelectorAll(".food-item, .total-row").forEach(
            element => element.remove()
        );

        
        let foodContainer = document.getElementById("orderFoodItems");

        if (!foodContainer) {
            foodContainer = document.createElement("div");
            foodContainer.id = "orderFoodItems";

            const heading = summaryCard.querySelector(".card-heading");

            if (heading) {
                heading.insertAdjacentElement("afterend", foodContainer);
            } else {
                summaryCard.prepend(foodContainer);
            }
        }

        
        let totalRow = document.getElementById("trackingTotalRow");

        if (!totalRow) {
            totalRow = document.createElement("div");
            totalRow.id = "trackingTotalRow";
            totalRow.className = "total-row";

            totalRow.innerHTML = `
                <span>Total Amount</span>
                <strong id="trackingGrandTotal">₹0</strong>
            `;

            foodContainer.insertAdjacentElement("afterend", totalRow);
        }

        
        let customerDetails = document.getElementById(
            "deliveryCustomerDetails"
        );

        if (!customerDetails) {
            customerDetails = document.createElement("div");
            customerDetails.id = "deliveryCustomerDetails";

            totalRow.insertAdjacentElement("afterend", customerDetails);
        }
    }

   

    function renderOrderInformation() {

        prepareSummaryArea();

        if (!currentOrder) {
            showNoOrderMessage();
            return;
        }

        const items = Array.isArray(currentOrder.items)
            ? currentOrder.items
            : [];

        const firstRestaurant = items.find(item => item.restaurant)?.restaurant;

        if (restaurantName) {
            restaurantName.textContent =
                firstRestaurant || "FoodieHub Restaurant";
        }

        if (orderIdElement) {
            orderIdElement.textContent = "#" + currentOrder.orderId;
        }

        const foodContainer = document.getElementById("orderFoodItems");
        const grandTotalElement = document.getElementById("trackingGrandTotal");
        const customerDetails = document.getElementById(
            "deliveryCustomerDetails"
        );

        
        if (foodContainer) {

            if (!items.length) {
                foodContainer.innerHTML = "<p>No food items found.</p>";
            } else {

                foodContainer.innerHTML = items.map(item => {

                    const price = Number(item.price) || 0;
                    const quantity = Number(item.quantity) || 1;

                    const image = item.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80";

                    return `
                        <div class="food-item">

                            <div class="food-image">
                                <img
                                    src="${escapeHTML(image)}"
                                    alt="${escapeHTML(item.name)}"
                                >
                            </div>

                            <div class="food-info">
                                <h3>${escapeHTML(item.name)}</h3>
                                <p>${quantity} × ${formatCurrency(price)}</p>
                            </div>

                            <strong>
                                ${formatCurrency(price * quantity)}
                            </strong>

                        </div>
                    `;

                }).join("");
            }
        }

       
        const bill = currentOrder.bill || {};

        const calculatedTotal = items.reduce((sum, item) => {
            return sum +
                (Number(item.price) || 0) *
                (Number(item.quantity) || 1);
        }, 0);

        if (grandTotalElement) {
            grandTotalElement.textContent = formatCurrency(
                bill.grandTotal ?? calculatedTotal
            );
        }

        
        const customer = currentOrder.customer || {};

        if (customerDetails) {
            customerDetails.innerHTML = `
                <div class="customer-order-details">
                    <h3>Delivery Details</h3>
                    <p><strong>Name:</strong> ${escapeHTML(customer.name || "Not provided")}</p>
                    <p><strong>Phone:</strong> ${escapeHTML(customer.phone || "Not provided")}</p>
                    <p><strong>Address:</strong> ${escapeHTML(customer.address || "Not provided")}</p>
                </div>
            `;
        }

        currentStatus = getStatusIndex(currentOrder.status);

        updateStatusUI();
    }

    

    function showNoOrderMessage() {

        if (restaurantName) {
            restaurantName.textContent = "No Active Order";
        }

        if (orderIdElement) {
            orderIdElement.textContent = "Not Available";
        }

        const foodContainer = document.getElementById("orderFoodItems");

        if (foodContainer) {
            foodContainer.innerHTML = `
                <div class="no-order-message">
                    <h3>No Orders Yet!</h3>
                    <p>Your placed orders will appear here.</p>
                    <a href="menu.html">Explore Menu</a>
                </div>
            `;
        }

        const total = document.getElementById("trackingGrandTotal");
        if (total) total.textContent = "₹0";

        const customerDetails = document.getElementById(
            "deliveryCustomerDetails"
        );

        if (customerDetails) customerDetails.innerHTML = "";

        if (statusHeading) {
            statusHeading.innerHTML =
                '<i class="fa-solid fa-bag-shopping"></i> No Order Found';
        }

        if (statusDescription) {
            statusDescription.textContent =
                "Place an order through our menu and it will appear here.";
        }

        if (etaHeading) etaHeading.textContent = "--";

        if (etaMessage) {
            etaMessage.textContent = "Waiting for your order.";
        }

        if (deliveryStatusHeading) {
            deliveryStatusHeading.textContent = "No Active Order";
        }

        if (progressFill) progressFill.style.width = "0%";

        progressItems.forEach(item => {
            item.classList.remove("active", "completed");
        });

        timelineItems.forEach(item => {
            item.classList.remove("active", "completed");
        });

        if (detailsButton) detailsButton.disabled = true;

        if (callButton) callButton.disabled = true;
    }

   

    function updateStatusUI() {

        if (!currentOrder) return;

        const status = statuses[currentStatus];

        if (statusHeading) {
            statusHeading.innerHTML =
                `<i class="fa-solid ${status.icon}"></i> ${status.heading}`;
        }

        if (statusDescription) {
            statusDescription.textContent = status.message;
        }

        if (etaHeading) etaHeading.textContent = status.eta;
        if (etaMessage) etaMessage.textContent = status.etaMessage;

        if (deliveryStatusHeading) {
            deliveryStatusHeading.textContent = status.heading;
        }

        if (progressFill) {
            progressFill.style.width = (currentStatus / 3) * 100 + "%";
        }

        
        progressItems.forEach((item, index) => {

            item.classList.remove("completed", "active");

            if (index < currentStatus) {
                item.classList.add("completed");
            } else if (index === currentStatus) {
                item.classList.add("active");
            }
        });

        
        timelineItems.forEach((item, index) => {

            item.classList.remove("completed", "active");

            const time = item.querySelector(".timeline-content span");
            const description = item.querySelector(".timeline-content p");

            if (index < currentStatus) {

                item.classList.add("completed");

                if (time) time.textContent = "Completed";

            } else if (index === currentStatus) {

                item.classList.add("active");

                if (time) time.textContent = "In Progress";
                if (description) description.textContent = status.message;

            } else {

                if (time) time.textContent = "Pending";
            }
        });

        const enjoyHeading = document.querySelector(".enjoy-section h2");

        if (enjoyHeading) {
            enjoyHeading.textContent = currentStatus === 3
                ? "🎉 Order Delivered! Enjoy Your Meal! 😋"
                : "Enjoy Your Meal! 😋";
        }

        const nextButton = document.getElementById("nextStatus");

        if (nextButton) {
            nextButton.disabled = currentStatus === 3;
            nextButton.textContent = currentStatus === 3
                ? "Order Delivered"
                : "Update Demo Status";
        }
    }

    

    function saveCurrentStatus() {

        if (!currentOrder) return;

        const orders = getOrders();

        const index = orders.findIndex(order =>
            String(order.orderId) === String(currentOrder.orderId)
        );

        if (index === -1) return;

        currentOrder.status = [
            "Confirmed",
            "Preparing",
            "On The Way",
            "Delivered"
        ][currentStatus];

        orders[index] = currentOrder;

        localStorage.setItem(
            ORDER_STORAGE_KEY,
            JSON.stringify(orders)
        );
    }

   

    function createStatusControls() {

        if (!currentOrder) return;

        const statusCard = document.querySelector(".status-card");

        if (!statusCard || document.querySelector(".tracking-controls")) {
            return;
        }

        const controls = document.createElement("div");
        controls.className = "tracking-controls";

        controls.innerHTML = `
            <button type="button" id="nextStatus">
                Update Demo Status
            </button>

            <button type="button" id="resetStatus">
                Reset Status
            </button>
        `;

        statusCard.appendChild(controls);

        document.getElementById("nextStatus").addEventListener("click", () => {

            if (currentStatus < 3) {
                currentStatus++;
                saveCurrentStatus();
                updateStatusUI();
            }
        });

        document.getElementById("resetStatus").addEventListener("click", () => {

            currentStatus = 0;
            saveCurrentStatus();
            updateStatusUI();
        });

        updateStatusUI();
    }

    

    function showModal(title, content) {

        const oldModal = document.querySelector(".custom-modal");

        if (oldModal) oldModal.remove();

        const modal = document.createElement("div");
        modal.className = "custom-modal";

        const modalContent = document.createElement("div");
        modalContent.className = "custom-modal-content";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "closeModal";
        closeButton.textContent = "✖";

        const heading = document.createElement("h2");
        heading.textContent = title;

        const message = document.createElement("div");
        message.className = "modalMessage";
        message.style.whiteSpace = "pre-line";
        message.textContent = content;

        modalContent.append(closeButton, heading, message);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        closeButton.addEventListener("click", () => modal.remove());

        modal.addEventListener("click", event => {
            if (event.target === modal) modal.remove();
        });
    }

   

    if (callButton) {
        callButton.addEventListener("click", () => {
            showModal(
                "Delivery Partner",
                "Rider contact details are not configured in this frontend demo."
            );
        });
    }

    

    if (detailsButton) {

        detailsButton.addEventListener("click", () => {

            if (!currentOrder) return;

            const customer = currentOrder.customer || {};
            const bill = currentOrder.bill || {};
            const items = currentOrder.items || [];

            const itemLines = items.map(item => {
                const quantity = Number(item.quantity) || 1;
                const price = Number(item.price) || 0;

                return `${item.name} × ${quantity} = ${formatCurrency(price * quantity)}`;
            });

            const details = [
                `Order ID: ${currentOrder.orderId}`,
                `Customer: ${customer.name || "Not provided"}`,
                `Phone: ${customer.phone || "Not provided"}`,
                `Address: ${customer.address || "Not provided"}`,
                "",
                "ORDER ITEMS",
                ...itemLines,
                "",
                `Subtotal: ${formatCurrency(bill.subtotal)}`,
                `Delivery Fee: ${formatCurrency(bill.deliveryFee)}`,
                `Taxes: ${formatCurrency(bill.taxes)}`,
                `Grand Total: ${formatCurrency(bill.grandTotal)}`,
                `Status: ${currentOrder.status || "Confirmed"}`
            ].join("\n");

            showModal("Your Order Details", details);
        });
    }

    

    function displayBookings() {

        if (!bookingHistoryList) return;

        let bookings = [];

        try {
            bookings = JSON.parse(
                localStorage.getItem(BOOKING_STORAGE_KEY) || "[]"
            );

            if (!Array.isArray(bookings)) bookings = [];

        } catch (error) {
            console.error("Error reading bookings:", error);
        }

        bookingHistoryList.innerHTML = "";

        if (!bookings.length) {

            bookingHistoryList.innerHTML = `
                <div class="no-bookings">
                    <div class="no-bookings-icon">🍽️</div>
                    <h3>No Table Bookings Yet</h3>
                    <p>Your confirmed table reservations will appear here.</p>
                    <a href="booking.html">Book Your First Table</a>
                </div>
            `;

            return;
        }

        bookings.slice().reverse().forEach(booking => {

            const card = document.createElement("div");
            card.className = "booking-history-card";

            const details = document.createElement("div");
            details.className = "booking-history-details";

            const heading = document.createElement("h3");
            heading.textContent =
                booking.restaurant || "FoodieHub Restaurant";

            details.appendChild(heading);

            [
                `Booking ID: ${booking.bookingId || "Not available"}`,
                `Table: ${booking.table || "Not available"}`,
                `Guests: ${booking.guests ?? "Not available"}`,
                `Date: ${booking.date || "Not available"}`,
                `Time: ${booking.time || "Not available"}`
            ].forEach(text => {

                const paragraph = document.createElement("p");
                paragraph.textContent = text;
                details.appendChild(paragraph);
            });

            const status = document.createElement("span");
            status.className = "booking-status";
            status.textContent = booking.status || "Confirmed";

            card.append(details, status);
            bookingHistoryList.appendChild(card);
        });
    }

    

    window.addEventListener("storage", event => {

        if (event.key === BOOKING_STORAGE_KEY) {
            displayBookings();
        }

        if (
            event.key === ORDER_STORAGE_KEY ||
            event.key === CURRENT_ORDER_KEY
        ) {
            location.reload();
        }
    });

   

    currentOrder = getCurrentOrder();

    renderOrderInformation();

    if (currentOrder) {
        createStatusControls();
    }

    displayBookings();

    console.log("FoodieHub Order Tracking Initialized!");

});

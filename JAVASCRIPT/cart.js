

const ORDER_STORAGE_KEY = "foodiehub_orders";
const CURRENT_ORDER_KEY = "foodiehub_current_order_id";

document.addEventListener("DOMContentLoaded", () => {
    initCartPage();
});

// ==========================================
// 1. TOAST NOTIFICATION
// ==========================================

let toastTimer = null;

function showToast(message) {
    let toast = document.getElementById("foodiehub-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "foodiehub-toast";
        toast.className = "foodiehub-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ==========================================
// 2. GET SHARED CART
// ==========================================

function getCart() {
    return window.FoodieHubCart.get();
}

// ==========================================
// 3. BILL CALCULATION
// ==========================================

function calculateBill(cart) {

    if (!cart.length) {
        return {
            subtotal: 0,
            deliveryFee: 0,
            taxes: 0,
            grandTotal: 0
        };
    }

    const subtotal = cart.reduce((sum, item) => {
        return sum +
            (Number(item.price) || 0) *
            (Number(item.quantity) || 1);
    }, 0);

    const deliveryFee = 40;
    const taxes = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + deliveryFee + taxes;

    return {
        subtotal,
        deliveryFee,
        taxes,
        grandTotal
    };
}

// ==========================================
// 4. UPDATE BILL UI
// ==========================================

function updateBillUI(bill) {

    document.getElementById("bill-subtotal").textContent =
        `₹${bill.subtotal.toLocaleString("en-IN")}`;

    document.getElementById("bill-delivery").textContent =
        `₹${bill.deliveryFee.toLocaleString("en-IN")}`;

    document.getElementById("bill-taxes").textContent =
        `₹${bill.taxes.toLocaleString("en-IN")}`;

    document.getElementById("bill-grand-total").textContent =
        `₹${bill.grandTotal.toLocaleString("en-IN")}`;
}

// ==========================================
// 5. UPDATE ITEM COUNT
// ==========================================

function updateItemCount(cart) {

    const totalCount = cart.reduce((sum, item) => {
        return sum + (Number(item.quantity) || 1);
    }, 0);

    const headerCount = document.getElementById("cart-item-count");

    headerCount.textContent =
        `${totalCount} ${totalCount === 1 ? "item" : "items"} in your cart`;

    window.FoodieHubCart.updateCounter();
}

// ==========================================
// 6. RENDER CART
// ==========================================

function renderCart() {

    const cart = getCart();

    const container = document.getElementById("cart-items-container");
    const note = document.querySelector(".cart-note");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!container) return;

    updateItemCount(cart);

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>
                    Looks like you haven't added anything to your cart yet.
                    Explore our delicious dishes and place an order!
                </p>
                <a href="homepage.html" class="empty-cart-btn">
                    Explore Food
                </a>
            </div>
        `;

        if (note) note.style.display = "none";

        if (checkoutBtn) {
            checkoutBtn.classList.add("disabled");
            checkoutBtn.setAttribute("aria-disabled", "true");
        }

        updateBillUI(calculateBill([]));
        return;
    }

    if (note) note.style.display = "flex";

    if (checkoutBtn) {
        checkoutBtn.classList.remove("disabled");
        checkoutBtn.removeAttribute("aria-disabled");
    }

    container.innerHTML = cart.map(item => {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const total = price * quantity;

        const restaurant = item.restaurant || "FoodieHub Kitchen";

        const image = item.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80";

        return `
            <div class="cart-item" data-id="${escapeHTML(item.id)}">

                <div class="cart-item-image">
                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(item.name)}"
                    >
                </div>

                <div class="cart-item-info">

                    <div class="item-title-row">
                        <div>
                            <h3>${escapeHTML(item.name)}</h3>
                            <p>${escapeHTML(restaurant)}</p>
                        </div>

                        <button
                            type="button"
                            class="remove-btn"
                            data-id="${escapeHTML(item.id)}"
                        >
                            Remove
                        </button>
                    </div>

                    <div class="item-bottom">

                        <span class="item-price">
                            ₹${price.toLocaleString("en-IN")}
                        </span>

                        <div class="quantity-box">

                            <button
                                type="button"
                                class="qty-btn qty-decrease"
                                data-id="${escapeHTML(item.id)}"
                                ${quantity <= 1 ? "disabled" : ""}
                            >−</button>

                            <span class="qty-display">${quantity}</span>

                            <button
                                type="button"
                                class="qty-btn qty-increase"
                                data-id="${escapeHTML(item.id)}"
                            >+</button>

                        </div>

                        <strong class="item-total">
                            ₹${total.toLocaleString("en-IN")}
                        </strong>

                    </div>
                </div>
            </div>
        `;

    }).join("");

    updateBillUI(calculateBill(cart));
}

// ==========================================
// 7. CART BUTTON EVENTS
// ==========================================

function initCartEvents() {

    const container = document.getElementById("cart-items-container");

    container.addEventListener("click", event => {

        const increaseBtn = event.target.closest(".qty-increase");
        const decreaseBtn = event.target.closest(".qty-decrease");
        const removeBtn = event.target.closest(".remove-btn");

        if (increaseBtn) {

            const id = increaseBtn.dataset.id;
            const item = getCart().find(item => item.id === id);

            if (item) {
                window.FoodieHubCart.add(item);
            }

            return;
        }

        if (decreaseBtn) {

            const id = decreaseBtn.dataset.id;
            const item = getCart().find(item => item.id === id);

            if (item && Number(item.quantity) > 1) {
                window.FoodieHubCart.removeOne(id);
            }

            return;
        }

        if (removeBtn) {

            const id = removeBtn.dataset.id;
            const item = getCart().find(item => item.id === id);

            if (item) {
                window.FoodieHubCart.remove(id);
                showToast(`Removed "${item.name}" from cart`);
            }
        }
    });

    const checkoutBtn = document.getElementById("checkout-btn");

    checkoutBtn.addEventListener("click", handleCheckout);
}

// ==========================================
// 8. CHECKOUT
// ==========================================

function handleCheckout() {

    const cart = getCart();

    if (!cart.length) {
        showToast("Your cart is empty!");
        return;
    }

    // Check whether the user is logged in
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {

        // Remember that the user wants to continue checkout
        sessionStorage.setItem("foodiehub_return_to_checkout", "true");

        // Redirect to login
        window.location.href = "login.html";

        return;
    }

    const bill = calculateBill(cart);

    showCheckoutModal(cart, bill);
}

// ==========================================
// 9. CHECKOUT MODAL
// ==========================================

function showCheckoutModal(cart, bill) {

    let backdrop = document.getElementById("checkout-modal-backdrop");

    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.id = "checkout-modal-backdrop";
        backdrop.className = "checkout-modal-backdrop";
        document.body.appendChild(backdrop);
    }

    const totalQty = cart.reduce((sum, item) => {
        return sum + Number(item.quantity || 1);
    }, 0);

    const itemListPreview = cart.map(item => {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        return `
            <div>
                <span>
                    ${escapeHTML(item.name)} × ${quantity}
                </span>
                <span>
                    ₹${(price * quantity).toLocaleString("en-IN")}
                </span>
            </div>
        `;

    }).join("");

    backdrop.innerHTML = `

        <div class="checkout-modal" role="dialog" aria-modal="true">

            <div class="checkout-modal-icon">🛍️</div>

            <h2>Complete Your Order</h2>

            <p>
                Enter your delivery details to place your order.
            </p>

            <div class="checkout-modal-summary">
                ${itemListPreview}

                <div>
                    <span>Delivery Fee</span>
                    <span>₹${bill.deliveryFee}</span>
                </div>

                <div>
                    <span>Taxes (5%)</span>
                    <span>₹${bill.taxes}</span>
                </div>

                <div>
                    <span>Grand Total (${totalQty} items)</span>
                    <strong>
                        ₹${bill.grandTotal.toLocaleString("en-IN")}
                    </strong>
                </div>
            </div>

            <form id="delivery-details-form">

                <div class="delivery-form-fields">

                    <input
                        type="text"
                        id="customer-name"
                        placeholder="Your Full Name"
                        maxlength="60"
                        required
                    >

                    <input
                        type="tel"
                        id="customer-phone"
                        placeholder="10-digit Mobile Number"
                        pattern="[0-9]{10}"
                        maxlength="10"
                        inputmode="numeric"
                        required
                    >

                    <textarea
                        id="delivery-address"
                        placeholder="Complete Delivery Address"
                        rows="3"
                        maxlength="300"
                        required
                    ></textarea>

                </div>

                <p class="checkout-demo-note">
                    🔒 Demo checkout only. No real payment will be processed.
                </p>

                <div class="checkout-modal-actions">

                    <button
                        type="button"
                        class="checkout-modal-btn checkout-modal-secondary"
                        id="modal-cancel-btn"
                    >
                        Back to Cart
                    </button>

                    <button
                        type="submit"
                        class="checkout-modal-btn checkout-modal-primary"
                        id="modal-confirm-btn"
                    >
                        Place Demo Order
                    </button>

                </div>

            </form>

        </div>
    `;

    backdrop.classList.add("show");

    const form = backdrop.querySelector("#delivery-details-form");

    backdrop.querySelector("#modal-cancel-btn")
        .addEventListener("click", () => {
            backdrop.classList.remove("show");
        });

    // Close when clicking outside modal
    backdrop.addEventListener("click", event => {
        if (event.target === backdrop) {
            backdrop.classList.remove("show");
        }
    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!form.reportValidity()) return;

        const customer = {
            name: document.getElementById("customer-name").value.trim(),
            phone: document.getElementById("customer-phone").value.trim(),
            address: document.getElementById("delivery-address").value.trim()
        };

        if (!customer.name || !customer.address) {
            showToast("Please complete your delivery details.");
            return;
        }

        if (!/^[0-9]{10}$/.test(customer.phone)) {
            showToast("Enter a valid 10-digit mobile number.");
            return;
        }

        placeOrder(cart, bill, customer);
    });
}

// ==========================================
// 10. SAVE ORDER
// ==========================================

function placeOrder(cart, bill, customer) {

    const confirmBtn = document.getElementById("modal-confirm-btn");

    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Placing Order...";
    }

    try {

        const existingOrders = JSON.parse(
            localStorage.getItem(ORDER_STORAGE_KEY) || "[]"
        );

        const orderId = "FH" + Date.now().toString().slice(-9);

        const order = {

            orderId: orderId,

            customer: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address
            },

            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1,
                image: item.image || "",
                restaurant: item.restaurant || "FoodieHub Kitchen"
            })),

            bill: {
                subtotal: bill.subtotal,
                deliveryFee: bill.deliveryFee,
                taxes: bill.taxes,
                grandTotal: bill.grandTotal
            },

            status: "Confirmed",

            createdAt: new Date().toISOString()

        };

        existingOrders.push(order);

        // Save order history
        localStorage.setItem(
            ORDER_STORAGE_KEY,
            JSON.stringify(existingOrders)
        );

        // Remember the latest order
        localStorage.setItem(CURRENT_ORDER_KEY, orderId);

        // Clear cart only after order is saved
        window.FoodieHubCart.clear();

        // Redirect to tracking
        window.location.href = "tracking.html";

    } catch (error) {

        console.error("Order saving error:", error);

        showToast("Unable to place order. Please try again.");

        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.textContent = "Place Demo Order";
        }
    }
}

// ==========================================
// 11. HTML ESCAPE FUNCTION
// ==========================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value).replace(/[&<>'"]/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    }[character]));
}

// ==========================================
// 12. INITIALIZATION
// ==========================================

function initCartPage() {

    renderCart();

    initCartEvents();

    window.addEventListener("foodiehub:cart-updated", () => {
        renderCart();
    });

    window.addEventListener("storage", event => {

        if (event.key === "foodiehub_cart") {
            renderCart();
        }
    });
}

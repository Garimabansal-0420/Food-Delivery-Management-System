/**
 * FoodieHub - Cart Page JavaScript
 * Handles:
 *  1. Dynamic Cart Display from localStorage ("foodiehub_cart")
 *  2. Quantity Management (+ and - buttons, min 1)
 *  3. Remove Item with immediate DOM & storage update
 *  4. Dynamic Bill Calculation (Subtotal, Fixed ₹40 Delivery Fee for non-empty carts, 5% Tax rounded, Grand Total)
 *  5. Empty Cart State with Continue Shopping link & zeroed bill
 *  6. Demo Checkout Confirmation Modal
 *  7. Cross-tab and page refresh synchronization
 */

const CART_STORAGE_KEY = 'foodiehub_cart';

document.addEventListener('DOMContentLoaded', () => {
    initCartPage();
});

// ==========================================
// 1. STORAGE HELPERS
// ==========================================
function getCart() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error('Error reading cart from localStorage:', err);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
        console.error('Error saving cart to localStorage:', err);
    }
    renderCart();
    updateCartCounter();
}

// ==========================================
// 2. TOAST NOTIFICATION
// ==========================================
let toastTimer = null;
function showToast(message) {
    let toast = document.getElementById('foodiehub-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'foodiehub-toast';
        toast.className = 'foodiehub-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ==========================================
// 3. CART COUNTER
// ==========================================
function updateCartCounter() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

    const navBadge = document.getElementById('cart-counter');
    if (navBadge) {
        navBadge.textContent = totalCount;
    }

    const headerCount = document.getElementById('cart-item-count');
    if (headerCount) {
        if (totalCount === 0) {
            headerCount.textContent = '0 items in your cart';
        } else if (totalCount === 1) {
            headerCount.textContent = '1 item in your cart';
        } else {
            headerCount.textContent = `${totalCount} items in your cart`;
        }
    }
}

// ==========================================
// 4. BILL CALCULATION
// ==========================================
function calculateBill(cart) {
    if (!cart || cart.length === 0) {
        return {
            subtotal: 0,
            deliveryFee: 0,
            taxes: 0,
            grandTotal: 0
        };
    }

    // Subtotal = Sum of (Price × Quantity)
    const subtotal = cart.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 1;
        return sum + (price * qty);
    }, 0);

    // Delivery Fee = ₹40 when cart is not empty, otherwise ₹0 (no free delivery threshold)
    const deliveryFee = 40;

    // Taxes & Charges = 5% of Subtotal, rounded to nearest rupee
    const taxes = Math.round(subtotal * 0.05);

    // Grand Total = Subtotal + Delivery Fee + Taxes
    const grandTotal = subtotal + deliveryFee + taxes;

    return {
        subtotal,
        deliveryFee,
        taxes,
        grandTotal
    };
}

function updateBillUI(bill) {
    const subtotalEl = document.getElementById('bill-subtotal');
    const deliveryEl = document.getElementById('bill-delivery');
    const taxesEl = document.getElementById('bill-taxes');
    const grandTotalEl = document.getElementById('bill-grand-total');

    if (subtotalEl) subtotalEl.textContent = `₹${bill.subtotal.toLocaleString('en-IN')}`;
    if (deliveryEl) deliveryEl.textContent = `₹${bill.deliveryFee.toLocaleString('en-IN')}`;
    if (taxesEl) taxesEl.textContent = `₹${bill.taxes.toLocaleString('en-IN')}`;
    if (grandTotalEl) grandTotalEl.textContent = `₹${bill.grandTotal.toLocaleString('en-IN')}`;
}

// ==========================================
// 5. RENDER CART ITEMS & EMPTY STATE
// ==========================================
function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    const noteEl = document.querySelector('.cart-note');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!container) return;

    if (cart.length === 0) {
        // EMPTY CART STATE
        container.innerHTML = `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet. Explore our delicious dishes and place an order!</p>
                <a href="homepage.html" class="empty-cart-btn">Explore Food</a>
            </div>
        `;

        if (noteEl) noteEl.style.display = 'none';
        if (checkoutBtn) {
            checkoutBtn.classList.add('disabled');
            checkoutBtn.setAttribute('aria-disabled', 'true');
        }

        updateBillUI({ subtotal: 0, deliveryFee: 0, taxes: 0, grandTotal: 0 });
        updateCartCounter();
        return;
    }

    if (noteEl) noteEl.style.display = 'flex';
    if (checkoutBtn) {
        checkoutBtn.classList.remove('disabled');
        checkoutBtn.removeAttribute('aria-disabled');
    }

    // RENDER ITEMS
    container.innerHTML = cart.map((item, index) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const itemTotal = itemPrice * itemQty;
        const restaurant = item.restaurant || 'FoodieHub Kitchen';
        const image = item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';

        return `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${escapeHTML(image)}" alt="${escapeHTML(item.name)}">
                </div>

                <div class="cart-item-info">
                    <div class="item-title-row">
                        <div>
                            <h3>${escapeHTML(item.name)}</h3>
                            <p>${escapeHTML(restaurant)}</p>
                        </div>

                        <button type="button" class="remove-btn" data-index="${index}" aria-label="Remove ${escapeHTML(item.name)}">
                            Remove
                        </button>
                    </div>

                    <div class="item-bottom">
                        <span class="item-price">
                            ₹${itemPrice.toLocaleString('en-IN')}
                        </span>

                        <div class="quantity-box">
                            <button type="button" class="qty-btn qty-decrease" data-index="${index}" aria-label="Decrease quantity" ${itemQty <= 1 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>−</button>
                            <span class="qty-display">${itemQty}</span>
                            <button type="button" class="qty-btn qty-increase" data-index="${index}" aria-label="Increase quantity">+</button>
                        </div>

                        <strong class="item-total">
                            ₹${itemTotal.toLocaleString('en-IN')}
                        </strong>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Update bill and counter
    const bill = calculateBill(cart);
    updateBillUI(bill);
    updateCartCounter();
}

// ==========================================
// 6. EVENT DELEGATION FOR CART ACTIONS
// ==========================================
function initCartEvents() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
        const target = e.target;

        // Increase Quantity (+)
        if (target.classList.contains('qty-increase') || target.closest('.qty-increase')) {
            const btn = target.classList.contains('qty-increase') ? target : target.closest('.qty-increase');
            const index = parseInt(btn.getAttribute('data-index'), 10);
            handleQuantityChange(index, 1);
            return;
        }

        // Decrease Quantity (−)
        if (target.classList.contains('qty-decrease') || target.closest('.qty-decrease')) {
            const btn = target.classList.contains('qty-decrease') ? target : target.closest('.qty-decrease');
            const index = parseInt(btn.getAttribute('data-index'), 10);
            handleQuantityChange(index, -1);
            return;
        }

        // Remove Item
        if (target.classList.contains('remove-btn') || target.closest('.remove-btn')) {
            const btn = target.classList.contains('remove-btn') ? target : target.closest('.remove-btn');
            const index = parseInt(btn.getAttribute('data-index'), 10);
            handleRemoveItem(index);
            return;
        }
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleCheckout();
        });
    }

    // Cross-tab sync
    window.addEventListener('storage', (e) => {
        if (e.key === CART_STORAGE_KEY) {
            renderCart();
        }
    });
}

function handleQuantityChange(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;

    const currentQty = Number(cart[index].quantity) || 1;
    const newQty = currentQty + delta;

    // Do not allow quantity below 1
    if (newQty < 1) {
        return;
    }

    cart[index].quantity = newQty;
    saveCart(cart);
}

function handleRemoveItem(index) {
    const cart = getCart();
    if (!cart[index]) return;

    const itemName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed "${itemName}" from cart`);
}

// ==========================================
// 7. CHECKOUT CONFIRMATION
// ==========================================
function handleCheckout() {
    const cart = getCart();
    if (!cart || cart.length === 0) {
        showToast('Your cart is empty! Please add items before proceeding to checkout.');
        return;
    }

    const bill = calculateBill(cart);
    showCheckoutModal(cart, bill);
}

function showCheckoutModal(cart, bill) {
    let backdrop = document.getElementById('checkout-modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'checkout-modal-backdrop';
        backdrop.className = 'checkout-modal-backdrop';
        document.body.appendChild(backdrop);
    }

    const totalQty = cart.reduce((s, i) => s + (Number(i.quantity) || 1), 0);
    const itemListPreview = cart.map(item => `
        <div>
            <span>${escapeHTML(item.name)} × ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        </div>
    `).join('');

    backdrop.innerHTML = `
        <div class="checkout-modal" role="dialog" aria-modal="true">
            <div class="checkout-modal-icon">🛍️</div>
            <h2>Order Confirmation</h2>
            <p>Review your order summary before placing your demo order.</p>

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
                    <span>₹${bill.grandTotal.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <p style="font-size:12px;color:#888;margin-bottom:18px;">
                🔒 This is a simulated checkout. No real payment or charges will be processed.
            </p>

            <div class="checkout-modal-actions">
                <button type="button" class="checkout-modal-btn checkout-modal-secondary" id="modal-cancel-btn">
                    Back to Cart
                </button>
                <button type="button" class="checkout-modal-btn checkout-modal-primary" id="modal-confirm-btn">
                    Place Demo Order
                </button>
            </div>
        </div>
    `;

    backdrop.classList.add('show');

    // Modal buttons
    const cancelBtn = backdrop.querySelector('#modal-cancel-btn');
    const confirmBtn = backdrop.querySelector('#modal-confirm-btn');

    cancelBtn.addEventListener('click', () => {
        backdrop.classList.remove('show');
    });

    confirmBtn.addEventListener('click', () => {
        backdrop.classList.remove('show');
        // Clear cart after placing demo order
        localStorage.removeItem(CART_STORAGE_KEY);
        renderCart();
        showToast('🎉 Demo Order Placed Successfully! Thank you.');
    });

    // Close when clicking outside modal
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.classList.remove('show');
        }
    });
}

// ==========================================
// 8. INITIALIZATION
// ==========================================
function initCartPage() {
    renderCart();
    initCartEvents();
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

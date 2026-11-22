/**
 * FoodieHub - Home Page JavaScript
 * Handles:
 *  1. Add to Cart with localStorage persistence ("foodiehub_cart")
 *  2. Live Cart Counter in Navbar
 *  3. Search functionality for popular food items (Button click & Enter key)
 *  4. Wishlist toggling and state restoration ("foodiehub_wishlist")
 */

document.addEventListener('DOMContentLoaded', () => {
    initCartCounter();
    initAddToCart();
    initWishlist();
    initSearch();
});

// ==========================================
// 1. CONSTANTS & STORAGE HELPERS
// ==========================================
const CART_STORAGE_KEY = 'foodiehub_cart';
const WISHLIST_STORAGE_KEY = 'foodiehub_wishlist';

// Map restaurant affiliations to match the rest of the FoodieHub app
const RESTAURANT_MAP = {
    'Cheese Pizza': 'Italiano Pizza',
    'Classic Burger': 'Burger House',
    'Chicken Biryani': 'Spice Garden',
    'Veg Noodles': 'Spice Garden'
};

function getCart() {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Failed to parse cart from localStorage:', err);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
        console.error('Failed to save cart to localStorage:', err);
    }
    updateCartCounter();
}

function getWishlist() {
    try {
        const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Failed to parse wishlist from localStorage:', err);
        return [];
    }
}

function saveWishlist(list) {
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
        console.error('Failed to save wishlist to localStorage:', err);
    }
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

    if (toastTimer) {
        clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ==========================================
// 3. CART COUNTER
// ==========================================
function updateCartCounter() {
    const counterElement = document.getElementById('cart-counter');
    if (!counterElement) return;

    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    counterElement.textContent = totalCount;
}

function initCartCounter() {
    updateCartCounter();

    // Listen to changes from other tabs or windows
    window.addEventListener('storage', (event) => {
        if (event.key === CART_STORAGE_KEY) {
            updateCartCounter();
        } else if (event.key === WISHLIST_STORAGE_KEY) {
            syncWishlistUI();
        }
    });
}

// ==========================================
// 4. ADD TO CART FUNCTIONALITY
// ==========================================
function initAddToCart() {
    const foodCards = document.querySelectorAll('.popular-food .food-card');

    foodCards.forEach(card => {
        const addBtn = card.querySelector('.add-btn');
        if (!addBtn) return;

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Extract item details from the existing HTML elements
            const nameEl = card.querySelector('h3');
            const priceEl = card.querySelector('.price');
            const imgEl = card.querySelector('.food-image img');
            const descEl = card.querySelector('.food-content p');

            const name = nameEl ? nameEl.textContent.trim() : 'Food Item';
            const priceRaw = priceEl ? priceEl.textContent.trim() : '0';
            const price = parseInt(priceRaw.replace(/[^\d]/g, ''), 10) || 0;
            const image = imgEl ? (imgEl.getAttribute('src') || imgEl.src) : '';
            const description = descEl ? descEl.textContent.trim() : '';
            const restaurant = RESTAURANT_MAP[name] || 'FoodieHub Kitchen';

            // Add item to cart or increase quantity if it already exists
            const cart = getCart();
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
            } else {
                cart.push({
                    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name: name,
                    restaurant: restaurant,
                    price: price,
                    image: image,
                    description: description,
                    quantity: 1
                });
            }

            saveCart(cart);
            showToast(`✓ Added "${name}" to your cart!`);

            // Temporary visual feedback on the button
            const originalText = addBtn.textContent;
            addBtn.textContent = '✓ Added!';
            addBtn.disabled = true;

            setTimeout(() => {
                addBtn.textContent = originalText;
                addBtn.disabled = false;
            }, 900);
        });
    });
}

// ==========================================
// 5. WISHLIST FUNCTIONALITY
// ==========================================
function syncWishlistUI() {
    const wishlist = getWishlist();
    const foodCards = document.querySelectorAll('.popular-food .food-card');

    foodCards.forEach(card => {
        const nameEl = card.querySelector('h3');
        const favBtn = card.querySelector('.favorite-btn');
        if (!nameEl || !favBtn) return;

        const name = nameEl.textContent.trim();
        const isFav = wishlist.some(item => (typeof item === 'string' ? item === name : item.name === name));

        if (isFav) {
            favBtn.textContent = '♥';
            favBtn.classList.add('active');
            favBtn.setAttribute('aria-label', `Remove ${name} from Wishlist`);
        } else {
            favBtn.textContent = '♡';
            favBtn.classList.remove('active');
            favBtn.setAttribute('aria-label', `Add ${name} to Wishlist`);
        }
    });
}

function initWishlist() {
    syncWishlistUI();

    const foodCards = document.querySelectorAll('.popular-food .food-card');

    foodCards.forEach(card => {
        const favBtn = card.querySelector('.favorite-btn');
        if (!favBtn) return;

        favBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const nameEl = card.querySelector('h3');
            const priceEl = card.querySelector('.price');
            const imgEl = card.querySelector('.food-image img');

            const name = nameEl ? nameEl.textContent.trim() : 'Food Item';
            const priceRaw = priceEl ? priceEl.textContent.trim() : '0';
            const price = parseInt(priceRaw.replace(/[^\d]/g, ''), 10) || 0;
            const image = imgEl ? (imgEl.getAttribute('src') || imgEl.src) : '';

            let wishlist = getWishlist();
            const existingIndex = wishlist.findIndex(item => (typeof item === 'string' ? item === name : item.name === name));

            if (existingIndex > -1) {
                // Remove from wishlist
                wishlist.splice(existingIndex, 1);
                favBtn.textContent = '♡';
                favBtn.classList.remove('active');
                favBtn.setAttribute('aria-label', `Add ${name} to Wishlist`);
                showToast(`Removed "${name}" from Wishlist`);
            } else {
                // Add to wishlist
                wishlist.push({
                    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name: name,
                    price: price,
                    image: image
                });
                favBtn.textContent = '♥';
                favBtn.classList.add('active');
                favBtn.setAttribute('aria-label', `Remove ${name} from Wishlist`);
                showToast(`♥ Saved "${name}" to Wishlist!`);
            }

            saveWishlist(wishlist);
        });
    });
}

// ==========================================
// 6. SEARCH FUNCTIONALITY
// ==========================================
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    const foodGrid = document.querySelector('.popular-food .food-grid');
    const foodCards = document.querySelectorAll('.popular-food .food-card');

    if (!searchInput || !searchBtn || !foodGrid) return;

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        let matchCount = 0;

        foodCards.forEach(card => {
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const desc = card.querySelector('.food-content p') ? card.querySelector('.food-content p').textContent.toLowerCase() : '';

            if (query === '' || title.includes(query) || desc.includes(query)) {
                card.style.display = '';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Manage "No Food Found" message
        let noMatchMessage = document.getElementById('no-food-found-msg');

        if (matchCount === 0) {
            if (!noMatchMessage) {
                noMatchMessage = document.createElement('div');
                noMatchMessage.id = 'no-food-found-msg';
                noMatchMessage.className = 'no-food-found';
                foodGrid.appendChild(noMatchMessage);
            }

            noMatchMessage.innerHTML = `
                <span class="no-food-icon">🍽️</span>
                <h3>No Food Found</h3>
                <p>We couldn't find any dishes matching "<strong>${escapeHTML(searchInput.value)}</strong>". Try searching for Pizza, Burger, Biryani, or Noodles.</p>
            `;
            noMatchMessage.style.display = '';
        } else if (noMatchMessage) {
            noMatchMessage.style.display = 'none';
        }

        // Smooth scroll to the popular food section if user entered a search query
        if (query !== '') {
            const popularSection = document.querySelector('.popular-food');
            if (popularSection) {
                popularSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Trigger on button click
    searchBtn.addEventListener('click', performSearch);

    // Trigger on Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Reset when search input is cleared
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            performSearch();
        }
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

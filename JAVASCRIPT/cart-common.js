
(function () {

    const CART_STORAGE_KEY = "foodiehub_cart";

    // Get all cart items
    function getCart() {
        try {
            const cart = JSON.parse(
                localStorage.getItem(CART_STORAGE_KEY) || "[]"
            );

            return Array.isArray(cart) ? cart : [];

        } catch (error) {
            console.error("Cart reading error:", error);
            return [];
        }
    }

    // Get total quantity
    function getCount() {
        return getCart().reduce((total, item) => {
            return total + Number(item.quantity || 0);
        }, 0);
    }

    // Update navbar counter
    function updateCounter() {
        const count = getCount();

        document.querySelectorAll("#cart-counter, #cartCount")
            .forEach(element => {
                element.textContent = count;
            });
    }

    // Save cart and notify pages
    function saveCart(cart) {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

        updateCounter();

        window.dispatchEvent(
            new CustomEvent("foodiehub:cart-updated")
        );
    }

    // Add item
    function add(item) {

        const cart = getCart();

        const existingItem = cart.find(element => {
            return String(element.id) === String(item.id);
        });

        if (existingItem) {
            existingItem.quantity =
                Number(existingItem.quantity || 0) + 1;
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
        }

        saveCart(cart);
    }

    // Decrease quantity by one
    function removeOne(id) {

        const cart = getCart();

        const index = cart.findIndex(item => {
            return String(item.id) === String(id);
        });

        if (index === -1) return false;

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveCart(cart);

        return true;
    }

    // Remove complete item
    function remove(id) {

        const cart = getCart();

        const updatedCart = cart.filter(item => {
            return String(item.id) !== String(id);
        });

        if (updatedCart.length === cart.length) {
            return false;
        }

        saveCart(updatedCart);

        return true;
    }

    // Clear complete cart
    function clear() {
        saveCart([]);
    }

    // Public methods
    window.FoodieHubCart = {
        get: getCart,
        add: add,
        removeOne: removeOne,
        remove: remove,
        clear: clear,
        count: getCount,
        updateCounter: updateCounter
    };

    // Synchronize other tabs
    window.addEventListener("storage", function (event) {

        if (event.key === CART_STORAGE_KEY) {
            updateCounter();

            window.dispatchEvent(
                new CustomEvent("foodiehub:cart-updated")
            );
        }

    });

    // Initial counter
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            updateCounter
        );
    } else {
        updateCounter();
    }

})();

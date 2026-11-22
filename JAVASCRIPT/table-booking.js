
// ==========================================
// FOODIEHUB TABLE BOOKING FUNCTIONALITY
// ==========================================

const BOOKING_STORAGE_KEY = "foodiehub_bookings";

let selectedTable = "T4";
let selectedGuests = 2;


// ==========================================
// 1. TABLE INFORMATION
// ==========================================

const tableData = {
    T1: 2,
    T2: 4,
    T3: 4,
    T4: 6,
    T5: 2,
    T6: 6,
    T7: 4,
    T8: 8
};


// ==========================================
// 2. GET HTML ELEMENTS
// ==========================================

const guestCount = document.getElementById("guestCount");

const selectedTableElement =
    document.getElementById("selectedTable");

const summaryTable =
    document.getElementById("summaryTable");

const tableCapacity =
    document.getElementById("tableCapacity");

const summaryGuests =
    document.getElementById("summaryGuests");

const bookingDate =
    document.getElementById("bookingDate");

const bookingTime =
    document.getElementById("bookingTime");

const decreaseButton =
    document.getElementById("decreaseGuests");

const increaseButton =
    document.getElementById("increaseGuests");


// ==========================================
// 3. UPDATE GUEST INFORMATION
// ==========================================

function updateGuests() {

    const capacity = tableData[selectedTable];

    selectedGuests = Math.max(
        1,
        Math.min(selectedGuests, capacity)
    );

    guestCount.textContent = selectedGuests;

    summaryGuests.textContent = selectedGuests;
}


// ==========================================
// 4. SELECT TABLE
// ==========================================

function selectTable(element, tableName) {

    if (!tableData[tableName]) {
        return;
    }

    // Remove previous selection
    document.querySelectorAll(".table").forEach(table => {
        table.classList.remove("selected");
    });

    // Select clicked table
    element.classList.add("selected");

    selectedTable = tableName;

    // Update selected table information
    selectedTableElement.textContent = tableName;

    summaryTable.textContent = tableName;

    tableCapacity.textContent =
        tableData[tableName] + " Guests";

    // Adjust guests if new table has lower capacity
    if (selectedGuests > tableData[tableName]) {
        selectedGuests = tableData[tableName];
    }

    updateGuests();
}


// ==========================================
// 5. INCREASE AND DECREASE GUESTS
// ==========================================

decreaseButton.addEventListener("click", function () {

    if (selectedGuests > 1) {
        selectedGuests--;
        updateGuests();
    }

});


increaseButton.addEventListener("click", function () {

    const capacity = tableData[selectedTable];

    if (selectedGuests < capacity) {

        selectedGuests++;
        updateGuests();

    } else {

        alert(
            "This table can accommodate only " +
            capacity + " guests."
        );

    }

});


// ==========================================
// 6. GET SAVED BOOKINGS
// ==========================================

function getBookings() {

    try {

        const bookings = JSON.parse(
            localStorage.getItem(BOOKING_STORAGE_KEY) || "[]"
        );

        return Array.isArray(bookings) ? bookings : [];

    } catch (error) {

        console.error("Booking reading error:", error);

        return [];

    }

}


// ==========================================
// 7. CONFIRM BOOKING
// ==========================================

function confirmBooking() {

    const name = document
        .getElementById("customerName")
        .value.trim();

    const email = document
        .getElementById("customerEmail")
        .value.trim();

    const phone = document
        .getElementById("customerPhone")
        .value.trim();

    const date = bookingDate.value;

    const time = bookingTime.value;


    // Validate name
    if (!name) {

        alert("Please enter your full name.");

        document.getElementById("customerName").focus();

        return;

    }


    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        document.getElementById("customerEmail").focus();

        return;

    }


    // Validate phone
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        document.getElementById("customerPhone").focus();

        return;

    }


    // Validate date
    if (!date) {

        alert("Please select a booking date.");

        bookingDate.focus();

        return;

    }


    // Validate time
    if (!time) {

        alert("Please select a booking time.");

        bookingTime.focus();

        return;

    }


    // Check future date and time
    const bookingDateTime = new Date(date + "T" + time);

    if (bookingDateTime <= new Date()) {

        alert("Please select a future date and time.");

        return;

    }


    // Create booking object
    const booking = {

        bookingId: "FH" + Date.now(),

        restaurant: "Spice Haven",

        table: selectedTable,

        capacity: tableData[selectedTable],

        guests: selectedGuests,

        date: date,

        time: time,

        customerName: name,

        customerEmail: email,

        customerPhone: phone,

        bookingFee: 99,

        status: "Confirmed",

        createdAt: new Date().toISOString()

    };


    // Save booking
    const bookings = getBookings();

    bookings.push(booking);

    try {

        localStorage.setItem(
            BOOKING_STORAGE_KEY,
            JSON.stringify(bookings)
        );

    } catch (error) {

        console.error("Booking saving error:", error);

        alert("Unable to save booking. Please try again.");

        return;

    }


    // Show confirmation
    alert(
        "BOOKING CONFIRMED!\n\n" +
        "Booking ID: " + booking.bookingId + "\n" +
        "Restaurant: " + booking.restaurant + "\n" +
        "Table: " + booking.table + "\n" +
        "Guests: " + booking.guests + "\n" +
        "Date: " + booking.date + "\n" +
        "Time: " + booking.time + "\n" +
        "Name: " + booking.customerName + "\n" +
        "Booking Fee: ₹99\n\n" +
        "Thank you for choosing FoodieHub!"
    );

}


// ==========================================
// 8. RESET BOOKING
// ==========================================

function resetBooking() {

    // Remove previous selection
    document.querySelectorAll(".table").forEach(table => {
        table.classList.remove("selected");
    });

    // Select default table T4
    const defaultTable = Array.from(
        document.querySelectorAll(".table")
    ).find(table => {
        return table.querySelector("strong")
            .textContent.trim() === "T4";
    });

    if (defaultTable) {
        defaultTable.classList.add("selected");
    }

    // Reset variables
    selectedTable = "T4";
    selectedGuests = 2;

    // Reset display
    selectedTableElement.textContent = "T4";
    summaryTable.textContent = "T4";
    tableCapacity.textContent = "6 Guests";

    updateGuests();

    // Reset input fields
    bookingDate.value = "";
    bookingTime.value = "19:30";

    document.getElementById("customerName").value = "";
    document.getElementById("customerEmail").value = "";
    document.getElementById("customerPhone").value = "";

}


// ==========================================
// 9. CALL RESTAURANT
// ==========================================

function callRestaurant() {

    window.location.href = "tel:+919876543210";

}


// ==========================================
// 10. INITIALIZE BOOKING
// ==========================================

function initializeBooking() {

    // Set minimum booking date to today
    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const today = year + "-" + month + "-" + day;

    bookingDate.min = today;


    // Set default table and guest information
    selectedTable = "T4";

    selectedGuests = 2;

    document.querySelectorAll(".table").forEach(table => {
        table.classList.remove("selected");
    });

    const defaultTable = Array.from(
        document.querySelectorAll(".table")
    ).find(table => {
        return table.querySelector("strong")
            .textContent.trim() === "T4";
    });

    if (defaultTable) {
        defaultTable.classList.add("selected");
    }

    selectedTableElement.textContent = "T4";

    summaryTable.textContent = "T4";

    tableCapacity.textContent = "6 Guests";

    updateGuests();

}


// ==========================================
// 11. START
// ==========================================

initializeBooking();

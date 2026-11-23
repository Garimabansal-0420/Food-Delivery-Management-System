
let register = document.getElementById("register");

let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let psd = document.getElementById("psd");
let cpsd = document.getElementById("cpsd");

let show = document.getElementById("show");

let error = document.getElementById("error");
let confirmError = document.getElementById("confirmError");
let strength = document.getElementById("strength");
let success = document.getElementById("success");


// JSON SERVER API
const API_URL = "http://localhost:3000/users";


// SHOW / HIDE PASSWORD

show.addEventListener("click", function() {

    if (psd.type === "password") {
        psd.type = "text";
        show.textContent = "Hide";
    }
    else {
        psd.type = "password";
        show.textContent = "Show";
    }

});


// PASSWORD STRENGTH CHECKER

psd.addEventListener("input", function() {

    let len = psd.value.length;

    if (len === 0) {
        strength.textContent = "";
    }
    else if (len < 6) {
        strength.textContent = "Weak Password";
        strength.style.color = "red";
    }
    else if (len < 10) {
        strength.textContent = "Medium Password";
        strength.style.color = "orange";
    }
    else {
        strength.textContent = "Strong Password";
        strength.style.color = "green";
    }

});


// CONFIRM PASSWORD CHECKER

cpsd.addEventListener("input", function() {

    if (cpsd.value === "") {
        confirmError.textContent = "";
    }
    else if (psd.value !== cpsd.value) {
        confirmError.textContent = "Passwords do not match";
        confirmError.style.color = "red";
    }
    else {
        confirmError.textContent = "Passwords matched";
        confirmError.style.color = "green";
    }

});


// REGISTRATION VALIDATION AND JSON SERVER

register.addEventListener("click", async function() {

    error.textContent = "";
    success.textContent = "";

    // Check empty fields

    if (name.value.trim() === "" ||
        email.value.trim() === "" ||
        phone.value.trim() === "" ||
        psd.value === "" ||
        cpsd.value === "") {

        error.textContent = "Please fill all the fields";
        return;
    }


    // Email validation

    if (!email.value.includes("@") || !email.value.includes(".")) {

        error.textContent = "Please enter a valid email";
        return;
    }


    // Phone number validation

    if (!/^\d{10}$/.test(phone.value.trim())) {

        error.textContent = "Phone number must contain 10 digits";
        return;
    }


    // Password validation

    if (psd.value.length < 6) {

        error.textContent = "Password must contain at least 6 characters";
        return;
    }


    // Confirm password validation

    if (psd.value !== cpsd.value) {

        error.textContent = "Passwords do not match";
        return;
    }


    // CHECK EXISTING USERS USING GET

    try {

        register.disabled = true;
        register.textContent = "Please wait...";

        let response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch users");
        }

        let users = await response.json();

        // Check whether email already exists

        let existingUser = users.find(function(user) {

            return user.email.toLowerCase() ===
                   email.value.trim().toLowerCase();

        });


        if (existingUser) {

            error.textContent = "Email is already registered. Please login.";
            return;
        }


        // CREATE NEW USER OBJECT

        let newUser = {

            name: name.value.trim(),
            email: email.value.trim().toLowerCase(),
            phone: phone.value.trim(),
            password: psd.value

        };


        // SAVE USER USING POST

        let saveResponse = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newUser)

        });


        if (!saveResponse.ok) {
            throw new Error("Registration failed");
        }


        // REGISTRATION SUCCESSFUL

        success.textContent = "Account created successfully!";

        sessionStorage.setItem("registrationSuccess", "true");

        window.location.href = "confirmation.html";


    }
    catch (err) {

        error.textContent = "Server error. Please try again.";

        console.log(err);

    }
    finally {

        register.disabled = false;
        register.textContent = "Register";

    }

});

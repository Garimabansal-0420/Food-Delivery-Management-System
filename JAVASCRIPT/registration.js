
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


// REGISTRATION VALIDATION

register.addEventListener("click", function() {

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

    if (phone.value.length !== 10 || isNaN(phone.value)) {

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


    // REGISTRATION SUCCESSFUL

    sessionStorage.setItem("registrationSuccess", "true");

    window.location.href = "confirmation.html";

});

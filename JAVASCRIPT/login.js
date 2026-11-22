
let name = document.getElementById("name");
let psd = document.getElementById("psd");

let login = document.getElementById("login");
let show = document.getElementById("show");

let error = document.getElementById("error");
let success = document.getElementById("success");

let username = "gaurav";
let password = "123456";


show.addEventListener("click", function() {

    if (psd.type === "password") {
        psd.type = "text";
        show.textContent = "Hide Password";
    }
    else {
        psd.type = "password";
        show.textContent = "Show Password";
    }

});


login.addEventListener("click", function() {

    error.textContent = "";
    success.textContent = "";

    if (name.value.trim() === "" || psd.value === "") {
        error.textContent = "Please fill all the fields";
        return;
    }

    if (name.value.trim() !== username) {
        error.textContent = "Invalid Username";
        return;
    }

    if (psd.value !== password) {
        error.textContent = "Incorrect Password";
        return;
    }

    success.textContent = "Login Successful! Welcome to FoodieHub";

    // Redirect only when username and password are correct
    window.location.href = "../HTML/homepage.html";

});


// GET NAVBAR ELEMENTS

let loginLink = document.getElementById("login-link");
let signupLink = document.getElementById("signup-link");

let userGreeting = document.getElementById("user-greeting");
let logoutBtn = document.getElementById("logout-btn");


// CHECK LOGIN STATUS

function updateNavbar() {

    let userData = sessionStorage.getItem("loggedInUser");

    if (userData) {

        let user = JSON.parse(userData);

        // Display username

        userGreeting.textContent = "Hello, " + user.name;

        // Show username and logout

        userGreeting.hidden = false;
        logoutBtn.hidden = false;

        // Hide login and signup

        loginLink.hidden = true;
        signupLink.hidden = true;

    }

    else {

        // Show login and signup

        loginLink.hidden = false;
        signupLink.hidden = false;

        // Hide username and logout

        userGreeting.hidden = true;
        logoutBtn.hidden = true;

    }

}


// LOGOUT FUNCTIONALITY

logoutBtn.addEventListener("click", function() {

    // Remove login session

    sessionStorage.removeItem("loggedInUser");

    // Update navbar

    updateNavbar();

    alert("You have been logged out successfully!");

});


// RUN WHEN PAGE LOADS

updateNavbar();

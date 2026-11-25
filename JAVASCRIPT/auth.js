// NAVBAR ELEMENTS

let loginLink = document.getElementById("login-link");
let signupLink = document.getElementById("signup-link");
let userGreeting = document.getElementById("user-greeting");
let logoutBtn = document.getElementById("logout-btn");


// DELETE ACCOUNT BUTTON

let deleteAccountBtn = document.getElementById("delete-account");


// UPDATE NAVBAR

function updateNavbar() {

    let userData = sessionStorage.getItem("loggedInUser");

    if (userData) {

        let user = JSON.parse(userData);

        userGreeting.textContent = "Hello, " + user.name;

        userGreeting.hidden = false;
        logoutBtn.hidden = false;

        loginLink.hidden = true;
        signupLink.hidden = true;

        // Show delete account button

        if (deleteAccountBtn) {
            deleteAccountBtn.hidden = false;
        }

    }
    else {

        loginLink.hidden = false;
        signupLink.hidden = false;

        userGreeting.hidden = true;
        logoutBtn.hidden = true;

        // Hide delete account button

        if (deleteAccountBtn) {
            deleteAccountBtn.hidden = true;
        }

    }

}


// LOGOUT FUNCTION

logoutBtn.addEventListener("click", function() {

    sessionStorage.removeItem("loggedInUser");

    updateNavbar();

    alert("You have been logged out successfully!");

});


// DELETE ACCOUNT FUNCTION

if (deleteAccountBtn) {

    deleteAccountBtn.addEventListener("click", async function() {

        let userData = sessionStorage.getItem("loggedInUser");

        if (!userData) {
            alert("Please login first.");
            return;
        }

        let user = JSON.parse(userData);

        let confirmDelete = confirm(
            "Are you sure you want to permanently delete your account?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            deleteAccountBtn.disabled = true;
            deleteAccountBtn.textContent = "Deleting...";

            let response = await fetch(
                "http://localhost:3000/users/" + user.id,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Account deletion failed");
            }

            sessionStorage.removeItem("loggedInUser");

            alert("Your account has been deleted successfully!");

            window.location.href = "../HTML/homepage.html";

        }
        catch (err) {

            alert("Unable to delete account. Please try again.");

            console.log(err);

            deleteAccountBtn.disabled = false;
            deleteAccountBtn.textContent = "Delete My Account";

        }

    });

}


// INITIALIZE NAVBAR

updateNavbar();
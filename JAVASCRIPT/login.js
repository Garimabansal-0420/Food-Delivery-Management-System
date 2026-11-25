
let name = document.getElementById("name");
let psd = document.getElementById("psd");

let login = document.getElementById("login");
let show = document.getElementById("show");

let error = document.getElementById("error");
let success = document.getElementById("success");


const API_URL = "http://localhost:3000/users";



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




login.addEventListener("click", async function() {

    error.textContent = "";
    success.textContent = "";

    

    if (name.value.trim() === "" || psd.value === "") {
        error.textContent = "Please fill all the fields";
        return;
    }

    try {

        login.disabled = true;
        login.textContent = "Please wait...";

        
        let response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch users");
        }

        let users = await response.json();


        let existingUser = users.find(function(user) {

            return user.name.toLowerCase() ===
                   name.value.trim().toLowerCase();

        });

       

            if (!existingUser) {
                error.textContent = "Username not registered. Redirecting to registration...";

                setTimeout(function() {
                    window.location.href = "registration.html";
                }, 1500);

                return;
            }

        

        if (existingUser.password !== psd.value) {
            error.textContent = "Incorrect Password";
            return;
        }

        

        success.textContent = "Login Successful! Welcome to FoodieHub";

      

        let loggedInUser = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone
        };

        sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

       

    // CHECK WHERE THE USER WANTS TO GO

let returnToPage = sessionStorage.getItem("foodiehub_return_to_page");

if (returnToPage) {

    sessionStorage.removeItem("foodiehub_return_to_page");

    window.location.href = returnToPage;

}
else {

    // CHECKOUT REDIRECT

    let returnToCheckout = sessionStorage.getItem(
        "foodiehub_return_to_checkout"
    );

    if (returnToCheckout === "true") {

        sessionStorage.removeItem("foodiehub_return_to_checkout");

        window.location.href = "cart.html";

    }
    else {

        window.location.href = "homepage.html";

    }

}

    }
    catch (err) {

        error.textContent = "Server error. Please try again.";
        console.log(err);

    }
    finally {

        login.disabled = false;
        login.textContent = "Login";

    }

});

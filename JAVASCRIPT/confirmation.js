
document.addEventListener("DOMContentLoaded", function () {

    // Get registration status from sessionStorage
    const registrationStatus =
        sessionStorage.getItem("registrationSuccess");


    // Check whether registration was successful
    if (registrationStatus !== "true") {

        // Redirect to registration page if accessed directly
        window.location.replace("register.html");

        return;
    }


    // Registration is successful
    console.log("Registration successful!");


    // Remove the flag so the confirmation page
    // cannot be reopened by refreshing or revisiting it
    sessionStorage.removeItem("registrationSuccess");


});

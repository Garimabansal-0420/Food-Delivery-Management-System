
document.addEventListener("DOMContentLoaded", function () {

    
    const registrationStatus =
        sessionStorage.getItem("registrationSuccess");


    
    if (registrationStatus !== "true") {

        
        window.location.replace("register.html");

        return;
    }


    
    console.log("Registration successful!");



    sessionStorage.removeItem("registrationSuccess");


});

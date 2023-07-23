

const loginButton = document.querySelector('.submit-button');

loginButton.addEventListener("click", (event) => {

    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (emailInput == "zkarnob@gmail.com" && passwordInput == "1234") {
        window.location.href = "/home";
    }
    else {
        alert("Verification failed!");
    }

})
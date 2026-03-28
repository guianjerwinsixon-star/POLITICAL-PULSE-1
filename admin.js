document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("user").value.trim();
    const passwordInput = document.getElementById("pass").value;
    const messageDisplay = document.getElementById("message");

    const VALID_USER = "admin";
    const VALID_PASS = "admin123";

    if (usernameInput === VALID_USER && passwordInput === VALID_PASS) {
        messageDisplay.style.color = "green";
        messageDisplay.textContent = "Access granted. Redirecting...";
        setTimeout(() => {
            window.location.href = "dashboard.html"; 
        }, 1500);
    } else {
        messageDisplay.style.color = "red";
        messageDisplay.textContent = "Invalid credentials.";
        document.getElementById("pass").value = "";
    }
});

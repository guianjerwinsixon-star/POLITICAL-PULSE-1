function showTab(tab) {
    document.getElementById('voterForm').style.display = tab === 'voter' ? 'block' : 'none';
    document.getElementById('adminForm').style.display = tab === 'admin' ? 'block' : 'none';
}

// Admin Login
document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('adminUser').value === "admin" && 
        document.getElementById('adminPass').value === "admin123") {
        localStorage.setItem('userRole', 'admin');
        localStorage.removeItem('voterEmail'); // Clear voter session
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("message").textContent = "Invalid Admin Credentials";
    }
});

// Voter Login
document.getElementById('voterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('voterEmail').value;
    if (email.endsWith('@gmail.com')) {
        localStorage.setItem('userRole', 'voter');
        localStorage.setItem('voterEmail', email);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("message").textContent = "Please use a valid @gmail.com address";
    }
});

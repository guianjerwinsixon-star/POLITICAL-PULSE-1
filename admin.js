function showTab(tab) {
    document.getElementById('voterForm').style.display = tab === 'voter' ? 'block' : 'none';
    document.getElementById('adminForm').style.display = tab === 'admin' ? 'block' : 'none';
}

document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('adminUser').value === "admin" && 
        document.getElementById('adminPass').value === "admin123") {
        localStorage.setItem('userRole', 'admin');
        localStorage.removeItem('voterEmail');
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("message").textContent = "Invalid Admin Credentials";
    }
});

document.getElementById('voterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('voterEmail').value;
    if (email.toLowerCase().endsWith('@gmail.com')) {
        localStorage.setItem('userRole', 'voter');
        localStorage.setItem('voterEmail', email.toLowerCase());
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("message").textContent = "Must be a @gmail.com address";
    }
});

function showTab(tab) {
    document.getElementById('voterForm').style.display = tab === 'voter' ? 'block' : 'none';
    document.getElementById('adminForm').style.display = tab === 'admin' ? 'block' : 'none';
}

if(document.getElementById('adminForm')) {
    document.getElementById('adminForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const u = document.getElementById('adminUser').value;
        const p = document.getElementById('adminPass').value;
        if (u === "admin" && p === "admin123") {
            localStorage.setItem('userRole', 'admin');
            localStorage.removeItem('voterEmail');
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("message").textContent = "Invalid Admin Credentials";
        }
    });
}

if(document.getElementById('voterForm')) {
    document.getElementById('voterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('voterEmail').value.toLowerCase();
        if (email.endsWith('@gmail.com')) {
            localStorage.setItem('userRole', 'voter');
            localStorage.setItem('voterEmail', email);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("message").textContent = "Use a valid @gmail.com address";
        }
    });
}

let state = JSON.parse(localStorage.getItem('pollData')) || {
    votes: { sarah: 0, vico: 0, leni: 0 },
    votedEmails: []
};

const userRole = localStorage.getItem('userRole');
const currentUserEmail = localStorage.getItem('voterEmail');
let chart;

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById("chart").getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sarah Duterte', 'Vico Sotto', 'Leni Robredo'],
            datasets: [{
                label: 'Verified Ballots',
                data: [state.votes.sarah, state.votes.vico, state.votes.leni],
                backgroundColor: ['#ff4d4d', '#4d94ff', '#ffb3d9'],
                borderColor: '#00f2ff',
                borderWidth: 1
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true, grid: { color: '#30305a' } } } }
    });

    if (userRole === 'admin') {
        document.getElementById('adminControls').style.display = 'block';
    }
    predictWinner();
});

function openDashboard() {
    document.getElementById("dashboard").style.display = "block";
    window.scrollTo({ top: 500, behavior: 'smooth' });
}

function vote(candidate) {
    if (userRole === 'admin') {
        alert("SECURITY ALERT: Administrative accounts are restricted from voting.");
        return;
    }
    if (state.votedEmails.includes(currentUserEmail)) {
        alert("DUPLICATE ENTRY: This Gmail account has already cast a ballot.");
        return;
    }
    state.votes[candidate]++;
    state.votedEmails.push(currentUserEmail);
    localStorage.setItem('pollData', JSON.stringify(state));
    chart.data.datasets[0].data = [state.votes.sarah, state.votes.vico, state.votes.leni];
    chart.update();
    predictWinner();
    alert("SUCCESS: Your vote has been recorded in the local database.");
}

function predictWinner() {
    const v = state.votes;
    const total = v.sarah + v.vico + v.leni;
    if (total === 0) {
        document.getElementById("prediction").textContent = "STATUS: Awaiting Initial Data...";
        return;
    }
    const winner = Object.keys(v).reduce((a, b) => v[a] > v[b] ? a : b);
    document.getElementById("prediction").innerHTML = `AI PREDICTION: <strong style="color:#00f2ff">${winner.toUpperCase()} IS LEADING</strong>`;
}

function resetPoll() {
    if (confirm("CRITICAL WARNING: This will permanently delete all voter records. Proceed?")) {
        localStorage.removeItem('pollData');
        location.reload();
    }
}

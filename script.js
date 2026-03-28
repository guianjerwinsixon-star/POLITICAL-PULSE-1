const state = JSON.parse(localStorage.getItem('pollData')) || {
    votes: { sarah: 0, vico: 0, leni: 0 },
    votedEmails: []
};

const userRole = localStorage.getItem('userRole');
const currentUserEmail = localStorage.getItem('voterEmail');
let chart;

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById("chart").getContext('2d');
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Sarah", "Vico", "Leni"],
            datasets: [{
                label: "Votes",
                data: [state.votes.sarah, state.votes.vico, state.votes.leni],
                backgroundColor: ["#ff4d4d", "#4d94ff", "#ffb3d9"]
            }]
        }
    });
    predictWinner();
});

function openDashboard() {
    document.getElementById("dashboard").style.display = "block";
}

function vote(candidate) {
    if (userRole === 'admin') {
        alert("Admins cannot vote. Please use a Gmail account to participate.");
        return;
    }
    if (state.votedEmails.includes(currentUserEmail)) {
        alert("You have already voted!");
        return;
    }
    state.votes[candidate]++;
    state.votedEmails.push(currentUserEmail);
    localStorage.setItem('pollData', JSON.stringify(state));
    chart.data.datasets[0].data = [state.votes.sarah, state.votes.vico, state.votes.leni];
    chart.update();
    predictWinner();
    alert("Vote successful!");
}

function predictWinner() {
    const v = state.votes;
    const total = v.sarah + v.vico + v.leni;
    if (total === 0) return;
    const winner = Object.keys(v).reduce((a, b) => v[a] > v[b] ? a : b);
    document.getElementById("prediction").innerHTML = `Leading: ${winner.toUpperCase()}`;
}

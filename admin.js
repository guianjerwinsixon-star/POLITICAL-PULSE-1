const state = JSON.parse(localStorage.getItem('pollData')) || {
    votes: { sarah: 0, vico: 0, leni: 0 },
    ballots: { online: 0, f2f: 0, hybrid: 0 },
    candidates: { sarah: "Sarah Duterte", vico: "Vico Sotto", leni: "Leni Robredo" }
};

document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateUI();
    predictWinner();
});

let chart;
function initChart() {
    const ctx = document.getElementById("chart").getContext('2d');
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.values(state.candidates),
            datasets: [{
                label: "Total Votes",
                data: [state.votes.sarah, state.votes.vico, state.votes.leni],
                backgroundColor: ["#ff4d4d", "#4d94ff", "#ffb3d9"]
            }]
        },
        options: { responsive: true }
    });
}

function vote(candidate, type) {
    state.votes[candidate]++;
    state.ballots[type]++;
    localStorage.setItem('pollData', JSON.stringify(state));
    updateUI();
    addVoterLog(candidate, type);
    predictWinner();
}

function updateUI() {
    const { votes, ballots } = state;
    const total = votes.sarah + votes.vico + votes.leni;
    Object.keys(votes).forEach(name => {
        const bar = document.querySelector(`.bar.${name}`);
        if (bar) bar.style.width = total > 0 ? `${(votes[name] / total * 100)}%` : '0%';
    });
    document.getElementById("online").textContent = ballots.online;
    document.getElementById("f2f").textContent = ballots.f2f;
    document.getElementById("hybrid").textContent = ballots.hybrid;
    if(chart) {
        chart.data.datasets[0].data = [votes.sarah, votes.vico, votes.leni];
        chart.update();
    }
}

function predictWinner() {
    const { votes, ballots } = state;
    const total = votes.sarah + votes.vico + votes.leni;
    if (total === 0) return;
    const weighted = (ballots.f2f * 1.2) + (ballots.online * 1.0) + (ballots.hybrid * 1.1);
    const confidence = Math.min(((weighted / (total * 1.2)) * 100), 99).toFixed(1);
    const leading = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
    document.getElementById("prediction").innerHTML = `<strong>Leading:</strong> ${state.candidates[leading]} <br> <small>Confidence: ${confidence}%</small>`;
}

function addVoterLog(candidate, type) {
    const list = document.getElementById("voters");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${state.candidates[candidate]}</strong> via ${type}`;
    list.prepend(li);
}

function openDashboard() {
    document.getElementById("dashboard").style.display = "block";
}

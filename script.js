const state = {
    votes: { sarah: 0, vico: 0, leni: 0 },
    ballots: { online: 0, f2f: 0, hybrid: 0 },
    candidates: {
        sarah: "Sarah Duterte",
        vico: "Vico Sotto",
        leni: "Leni Robredo"
    }
};

const ctx = document.getElementById("chart").getContext('2d');
const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: Object.values(state.candidates),
        datasets: [{
            label: "Total Votes",
            data: [0, 0, 0],
            backgroundColor: ["#ff4d4d", "#4d94ff", "#ffb3d9"],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
    }
});

function openDashboard() {
    const dashboard = document.getElementById("dashboard");
    dashboard.style.display = "block";
    dashboard.scrollIntoView({ behavior: 'smooth' });
}

async function vote(candidate, type) {
    const formData = new FormData();
    formData.append('candidate', candidate);
    formData.append('type', type);

    try {
        const response = await fetch('process_vote.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        state.votes = data.votes;
        state.ballots = data.ballots;

        updateUI();
        addVoterLog(candidate, type);
        predictWinner();
    } catch (error) {
        console.error("Error saving vote:", error);
    }
}

function updateUI() {
    const { votes, ballots } = state;
    const total = votes.sarah + votes.vico + votes.leni;

    Object.keys(votes).forEach(name => {
        const bar = document.querySelector(`.bar.${name}`);
        if (bar) {
            const percentage = total > 0 ? (votes[name] / total * 100) : 0;
            bar.style.width = `${percentage}%`;
        }
    });

    document.getElementById("online").textContent = ballots.online;
    document.getElementById("f2f").textContent = ballots.f2f;
    document.getElementById("hybrid").textContent = ballots.hybrid;

    chart.data.datasets[0].data = [votes.sarah, votes.vico, votes.leni];
    chart.update('none');
}

function addVoterLog(candidate, type) {
    const list = document.getElementById("voters");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${state.candidates[candidate]}</strong> voted via <span>${type}</span>`;
    list.prepend(li);
    if (list.children.length > 10) list.lastElementChild.remove();
}

function predictWinner() {
    const { votes, ballots } = state;
    const totalVotes = votes.sarah + votes.vico + votes.leni;
    
    if (totalVotes === 0) return;

    const weightedTotal = (ballots.f2f * 1.2) + (ballots.online * 1.0) + (ballots.hybrid * 1.1);
    const confidenceScore = Math.min(((weightedTotal / (totalVotes * 1.2)) * 100), 99).toFixed(1);

    const maxVotes = Math.max(...Object.values(votes));
    const leadingKey = Object.keys(votes).find(key => votes[key] === maxVotes);

    const display = document.getElementById("prediction");
    display.innerHTML = `
        <div class="prediction-output">
            <p><strong>Leading:</strong> ${state.candidates[leadingKey]}</p>
            <p style="font-size: 0.8rem; opacity: 0.7;">AI Confidence: ${confidenceScore}%</p>
        </div>
    `;
}

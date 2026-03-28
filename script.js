// Load data from LocalStorage
const state = JSON.parse(localStorage.getItem('pollData')) || {
    votes: { sarah: 0, vico: 0, leni: 0 },
    ballots: { online: 0, f2f: 0, hybrid: 0 },
    votedEmails: [] // Track who has voted
};

const userRole = localStorage.getItem('userRole');
const currentUserEmail = localStorage.getItem('voterEmail');

function vote(candidate, type) {
    // 1. Check if Admin
    if (userRole === 'admin') {
        alert("ACCESS DENIED: Admins are for monitoring only. Please log in using a Gmail account to vote.");
        return;
    }

    // 2. Check if already voted
    if (state.votedEmails.includes(currentUserEmail)) {
        alert("ALREADY VOTED: You have already cast your ballot. One vote per Gmail account only!");
        return;
    }

    // 3. Process Vote
    state.votes[candidate]++;
    state.ballots[type]++;
    state.votedEmails.push(currentUserEmail); // Mark email as "done"
    
    // Save to browser memory
    localStorage.setItem('pollData', JSON.stringify(state));
    
    updateUI();
    alert("Success! Your vote has been recorded.");
}

// ... Keep your updateUI() and chart functions the same as before ...

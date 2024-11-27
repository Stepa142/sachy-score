let scores = {
    chajvy: 0,
    timy: 0
};

function loadScores() {
    const savedScores = localStorage.getItem('chessScores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateDisplay();
    }
}

function saveScores() {
    localStorage.setItem('chessScores', JSON.stringify(scores));
}

function updateDisplay() {
    document.getElementById('chajvy-wins').textContent = scores.chajvy;
    document.getElementById('timy-wins').textContent = scores.timy;
    
    const totalGames = scores.chajvy + scores.timy;
    document.getElementById('total-games').textContent = totalGames;
    
    const chajvyRate = totalGames ? ((scores.chajvy / totalGames) * 100).toFixed(1) : 0;
    const timyRate = totalGames ? ((scores.timy / totalGames) * 100).toFixed(1) : 0;
    
    document.getElementById('chajvy-rate').textContent = chajvyRate;
    document.getElementById('timy-rate').textContent = timyRate;
    
    updateChart();
}

function addWin(player) {
    scores[player]++;
    saveScores();
    updateDisplay();
}

function removeWin(player) {
    if (scores[player] > 0) {
        scores[player]--;
        saveScores();
        updateDisplay();
    }
}

function resetStats() {
    if (confirm('Opravdu chcete resetovat všechny statistiky?')) {
        scores.chajvy = 0;
        scores.timy = 0;
        saveScores();
        updateDisplay();
    }
}

let winChart;
function initChart() {
    const ctx = document.getElementById('winChart').getContext('2d');
    winChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Chajvy', 'Timy'],
            datasets: [{
                data: [scores.chajvy, scores.timy],
                backgroundColor: ['#4CAF50', '#2196F3']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateChart() {
    winChart.data.datasets[0].data = [scores.chajvy, scores.timy];
    winChart.update();
}

document.addEventListener('DOMContentLoaded', () => {
    loadScores();
    initChart();
});
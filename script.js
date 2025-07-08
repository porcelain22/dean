// Start button logic
const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const mainContent = document.getElementById('main-content');

startBtn.addEventListener('click', () => {
    startContainer.style.display = 'none';
    mainContent.style.display = 'flex';
});

// Progress bar logic for multiple skills (fix: each skill has its own value, always up to date)
function updateBar(bar, value) {
    value = Math.max(1, Math.min(5, value));
    bar.setAttribute('data-value', value);
}

document.querySelectorAll('.char-sheet').forEach(sheet => {
    sheet.querySelectorAll('.skill-row').forEach(row => {
        const bar = row.querySelector('.bar');
        row.querySelector('.plus').addEventListener('click', () => {
            let value = parseInt(bar.getAttribute('data-value'));
            if (value < 5) value++;
            updateBar(bar, value);
        });
        row.querySelector('.minus').addEventListener('click', () => {
            let value = parseInt(bar.getAttribute('data-value'));
            if (value > 1) value--;
            updateBar(bar, value);
        });
    });
});

// Music mute/unmute and autoplay fix
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');
let muted = false;

function playMusic() {
    music.muted = false;
    muteBtn.textContent = '🔊';
    // Try to play, required by some browsers after user interaction
    music.play().catch(() => {});
}

muteBtn.addEventListener('click', () => {
    muted = !muted;
    music.muted = muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
    if (!muted) playMusic();
});

// Ensure music starts after first user interaction (browser policy)
window.addEventListener('click', function once() {
    playMusic();
    window.removeEventListener('click', once);
});

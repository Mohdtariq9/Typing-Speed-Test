const quoteEl = document.getElementById('qoute');
const inputEl = document.getElementById('input');

const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');

const restartBtn = document.getElementById('restart');

let quote = '';
let startTime;
let timerInterval;

// Fetch random quote
async function getRandomQuote() {

    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    return data.content;

}

// Start test
async function startTest() {

    quote = await getRandomQuote();
    quoteEl.textContent = quote;

    inputEl.value = '';
    inputEl.disabled = false;
    inputEl.focus();

    timeEl.textContent = '0';
    wpmEl.textContent = '0';
    accuracyEl.textContent = '0';

    startTime = null;
    clearInterval(timerInterval);

}

// Timer
function startTimer() {

    let seconds = 0;

    timerInterval = setInterval(() => {

        seconds++;
        timeEl.textContent = seconds;

    }, 1000);
}

// Typing event
inputEl.addEventListener('input', () => {
    const input = inputEl.value;

    if (!startTime) {
        startTime = new Date();
        startTimer()
    }

    // If input matches quotes (done typing)
    if (input === quote) {
        clearInterval(timerInterval);
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;

        const words = quote.split(' ').length;
        const wpm = Math.round((words / timeTaken) * 60);
        wpmEl.textContent = wpm;

        // Accuracy
        let correctChars = 0;
        for (let i = 0; i < quote.length; i++) {
            if (quote[i] === input[i]) {
                correctChars++;
            }
        }
        const accuracy = Math.round((correctChars / quote.length) * 100);
        accuracyEl.textContent = accuracy;

        inputEl.disabled = true;

    }
});

// Restart
restartBtn.addEventListener('click', startTest);

// Start on load
startTest();

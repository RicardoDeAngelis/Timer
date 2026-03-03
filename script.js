let storedTime = 0;
let runningTime = 0;
let timerId = null;
let isPreCounting = false;
let preCounter = 10;

const display = document.getElementById('display');
const statusText = document.getElementById('status');

function playBeep(freq, type = 'square') {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, context.currentTime);
    gain.gain.setValueAtTime(0.2, context.currentTime);
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    osc.start();
    osc.stop(context.currentTime + 0.3);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

function updateDisplay(val) {
    const m = Math.floor(val / 60);
    const s = val % 60;
    display.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function adjustTime(type, amount) {
    if (timerId) return; 
    if (type === 'min') storedTime = Math.max(0, storedTime + amount * 60);
    if (type === 'sec') storedTime = Math.max(0, storedTime + amount);
    runningTime = storedTime;
    updateDisplay(runningTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (timerId || storedTime <= 0) return;
    
    isPreCounting = true;
    preCounter = 10;
    statusText.innerText = "¡PREPÁRATE!";
    
    timerId = setInterval(() => {
        if (isPreCounting) {
            if (preCounter <= 3 && preCounter > 0) playBeep(440);
            display.innerText = preCounter;
            
            if (preCounter <= 0) {
                isPreCounting = false;
                statusText.innerText = "¡EN MARCHA!";
                display.classList.add('running-pulse'); // <--- PULSO: Inicia animación
                playBeep(800);
            } else {
                preCounter--;
            }
        } else {
            runningTime--;
            updateDisplay(runningTime);

            if (runningTime === 30) speakText("Halfway there");
            else if (runningTime === 10) speakText("Ten seconds");
            else if (runningTime <= 3 && runningTime > 0) playBeep(700);

            if (runningTime <= 0) {
                clearInterval(timerId);
                timerId = null;
                playBeep(1000);
                statusText.innerText = "¡TIEMPO!";
                display.classList.remove('running-pulse'); // <--- PULSO: Finaliza animación
            }
        }
    }, 1000);
});

document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    statusText.innerText = "Pausado";
    display.classList.remove('running-pulse'); // <--- PULSO: Pausa animación
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    storedTime = 0;
    runningTime = 0;
    isPreCounting = false;
    statusText.innerText = "Preparado";
    display.classList.remove('running-pulse'); // <--- PULSO: Resetea animación
    updateDisplay(0);
});
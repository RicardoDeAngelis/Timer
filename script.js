let storedTime = 0;
let runningTime = 0;
let timerId = null;
let isPreCounting = false;
let preCounter = 10;

const display = document.getElementById('display');
const statusText = document.getElementById('status');

// He actualizado la función para aceptar el 'tipo' de onda (default 'square' para que suene más a alarma)
function playBeep(freq, type = 'square') {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.type = type; // Ahora usamos 'square' para un sonido más marcado
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
            // LÓGICA NUEVA: Solo suena si quedan 3 segundos o menos
            if (preCounter <= 3 && preCounter > 0) {
                playBeep(440); 
            }
            
            display.innerText = preCounter;
            
            if (preCounter <= 0) {
                isPreCounting = false;
                statusText.innerText = "¡EN MARCHA!";
                playBeep(800); // Sonido de inicio
            } else {
                preCounter--;
            }
        } else {
            runningTime--;
            updateDisplay(runningTime);

            if (runningTime === 30) speakText("Halfway there");
            else if (runningTime === 10) speakText("Ten seconds");

            // Sonidos de cuenta regresiva final
            if (runningTime <= 3 && runningTime > 0) {
                playBeep(700);
            }

            if (runningTime <= 0) {
                clearInterval(timerId);
                timerId = null;
                playBeep(1000);
                statusText.innerText = "¡TIEMPO!";
            }
        }
    }, 1000);
});

document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    statusText.innerText = "Pausado";
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    storedTime = 0;
    runningTime = 0;
    isPreCounting = false;
    statusText.innerText = "Preparado";
    updateDisplay(0);
});

// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Service Worker registrado:', reg))
            .catch((err) => console.log('Error al registrar Service Worker:', err));
    });
}
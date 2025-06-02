import dico from './dico.js';

const keyboard = document.getElementById("keyboard");
const elements = {
    wordDisplay: document.getElementById("wordToFind"),
    tryCounter: document.getElementById('nbTry'),
    endMessage: document.getElementById('endMsg')
};

let nbTry = 5;
let foundLetters = new Set();
let wordToGuess;

// Création du clavier (une seule fois)
for (let i = "A".charCodeAt(0);i <= "Z".charCodeAt(0); i++) {
    const touche = document.createElement('button')
    touche.innerText = String.fromCharCode(i)
    touche.classList.add('keyboard-btn')
    keyboard.append(touche)
}

// Délégation d'événement (plus efficace)
keyboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('keyboard-btn') && !e.target.disabled) {
        verifAnswer(e.target.innerText);
        disableBtn(e.target);
    }
});

function startGame() {
    wordToGuess = findWord();
    console.log(wordToGuess)
    updateDisplay();
}

function resetGame() {
    wordToGuess = findWord();
    console.log(wordToGuess)
    foundLetters.clear();
    nbTry = 5;

    document.querySelectorAll('.keyboard-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });

    keyboard.hidden = false;
    elements.endMessage.innerText = '';
    elements.wordDisplay.style.color = 'white';
    updateDisplay();
}

function disableBtn(btn) {
    btn.disabled = true;
    btn.classList.add('disabled');
}

function verifAnswer(answer) {
    if (wordToGuess.includes(answer)) {
        foundLetters.add(answer);
    } else {
        nbTry--;
    }
    updateDisplay();
}

function updateDisplay() {
    const displayText = wordToGuess.replace(/\w/g, char =>
        foundLetters.has(char) ? char : '_'
    );

    elements.tryCounter.innerText = nbTry;
    elements.wordDisplay.innerText = displayText;
    verifWin();
}

function verifWin() {
    if (!elements.wordDisplay.innerText.includes('_')) {
        endGame('BIG WIN', '#69ff69');
    } else if (nbTry === 0) {
        endGame('LOSER', 'red');
    }
}

function endGame(message, color) {
    keyboard.hidden = true;
    elements.endMessage.innerText = message;
    elements.endMessage.style.color = color;
    elements.wordDisplay.innerText = wordToGuess;
    elements.wordDisplay.style.color = color;
}

function findWord() {
    return dico[Math.floor(Math.random() * dico.length)];
}

document.querySelector('#retry button').addEventListener('click', resetGame);
startGame();
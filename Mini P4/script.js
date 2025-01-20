let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);

const submit = document.querySelector('#subt');
const UserInput = document.querySelector('#guessField');
const PreviousGuess = document.querySelector('.guesses');
const RemainingGuess = document.querySelector('.lastresult');
const LowOrHi = document.querySelector('.lowOrHi');
const StartOver = document.querySelector('.result');
const message = document.querySelector('.message');
let p = document.createElement('p');

let PrevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const UserGuess = parseInt(UserInput.value);
        if (UserInput.value.trim() === "") {
            message.innerHTML = "Input cannot be empty. Please enter a number.";
            message.style.color = 'red';
            return;
        }
        validInput(UserGuess);
    });
}

function validInput(guess) {
    if (isNaN(guess)) {
        message.innerHTML = "Please enter a valid number";
        message.style.color = 'red';
    } else if (guess < 1) {
        message.innerHTML = "Please enter a number more than 1";
        message.style.color = 'red';
    } else if (guess > 100) {
        message.innerHTML = "Please enter a number less than 100";
        message.style.color = 'red';
    } else if (PrevGuess.includes(guess)) { 
        message.innerHTML = "You already guessed that number. Try another one.";
        message.style.color = 'red';
    } else {
        PrevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`, 'red');
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        message.innerHTML = `You are Right! The number is ${guess}`;
        message.style.color = 'green';
        endGame();
    } else if (guess > randomNumber) {
        message.innerHTML = "Number is too large!";
        message.style.color = 'orange';
    } else if (guess < randomNumber) {
        message.innerHTML = "Number is too small!";
        message.style.color = 'blue';
    }
}

function displayGuess(guess) {
    UserInput.value = "";
    PreviousGuess.innerHTML += `${guess} `;
    numGuess++;
    RemainingGuess.innerHTML = `${11 - numGuess}`;
}

function displayMessage(msg, color) {
    message.innerHTML = msg;
    message.style.color = color;
}

function endGame() {
    UserInput.value = '';
    UserInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    StartOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newgame = document.querySelector('#newGame');
    newgame.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        playGame = true;
        PrevGuess = [];
        numGuess = 1;
        PreviousGuess.innerHTML = '';
        RemainingGuess.innerHTML = `${11 - numGuess}`;
        UserInput.removeAttribute('disabled');
        StartOver.removeChild(p);
        message.innerHTML = "";
        message.style.color = 'black';
    });
}

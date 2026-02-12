//Gameplay Constants
let pairsFound = 0;
let difficulty = 'easy';

let moves = sessionStorage.getItem(`${difficulty}Moves`) ?? 0;


let currPair = JSON.parse(sessionStorage.getItem(`${difficulty}Pair`)) ?? [];

let deck = ['images/apple.jpg', 'images/apple.jpg', 
    'images/lemon.avif', 'images/lemon.avif', 
    'images/orange.jpg', 'images/orange.jpg', 
    'images/pear.png', 'images/pear.png'];
let visibleDeck;

//audio constants
const flipAudio = new Audio('audio/flip.mp3');
const matchAudio =  new Audio('audio/match.mp3');
const winAudio = new Audio('audio/win.wav');


//Unflip Constants
let isUnFlipping = false;
let timeOutTimer = null;
let unflipping = [];
let currIndices = [];

//Initial page elements

let main = document.querySelector('.cardDeck');
let movesContainer = document.querySelector('#moves');
let movesText = document.querySelector('#moves h2')
movesText.textContent = `Moves: ${moves}`;
let sidebar = document.querySelector('.sidebar');

if (sessionStorage.getItem(`difficulty`)) {
    let difficultySelection = document.getElementById("diffSelector");
    difficultySelection.value = sessionStorage.getItem(`difficulty`);
}

const showInstructions = () => {
    const instructions = document.getElementById('instructions');
    const button = document.getElementById('instructionsButton');
    if (instructions.hidden) {
        instructions.hidden = false;

        button.textContent = 'Hide Instructions';
    }
    else {
        instructions.hidden = true;

    const button = document.getElementById('instructionsButton');
    button.innerText = 'Show Instructions';
    }
}

//the fisher-yates algorithm for shuffling an array
const shuffleDeck = (deck) => {
    let currIndex = deck.length;

    while (currIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currIndex);
        currIndex--;

        [deck[currIndex], deck[randomIndex]] = [deck[randomIndex], deck[currIndex]];
    }
}

//helper method for flipping a card back over
const flipBack = (id1, id2) => {
    const card1 = document.querySelector(id1);
    const card2 = document.querySelector(id2);

    card1.src = 'images/question.png';
    card2.src = 'images/question.png';
    

    isUnFlipping = false;
    card1.classList.remove('flipping');
    card2.classList.remove('flipping');

    //reset unflipping constants
    unflipping = [];
    currIndices = [];

    
}
//automatically unflips two unmatching cards if new card is flipped
const skipFlipBackTimer = () => {
    clearTimeout(timeOutTimer);
    flipBack(unflipping[0], unflipping[1]);

    
    timeOutTimer = null;
    
}

const endGame = () => {
    
    if (visibleDeck.includes('images/question.png')) {
            movesContainer.innerHTML = `
            <h2>Total Moves: ${localStorage.getItem("totalMoves")}</h2>
  <h2>Moves: ${moves}</h2>`
        }
    else {
        winAudio.play();
    movesContainer.innerHTML = `
  <h1>YOU WIN!</h1>
  <h3>You used: ${moves} moves</h3>`; 
    } 
}
//helper method for flipping a card over
const flip = (id, cardContainer, index) => {
    flipAudio.play();

    if (unflipping.length == 2) {
        skipFlipBackTimer();
    }
    
    
    let cardImage = document.querySelector(`#${id}`);
    cardImage.src = deck[index];
    visibleDeck[index] = deck[index];
    cardImage.classList.add('flipping');
    
    cardContainer.append(cardImage);
    currPair.push(`#${id}`);
    currIndices.push(index);

    
    

    //two cards are unflipped; check if match
    if (currPair.length == 2) {
        moves++;

        //adds each move to the local storage Total Moves
        localStorage.setItem("totalMoves", parseInt(localStorage.getItem("totalMoves") ?? 0) + 1);
        isUnFlipping = true;
        const id1 = currPair[0];
        const id2 = currPair[1];
        const src1 = document.querySelector(id1).src;
        const src2 = document.querySelector(id2).src;

        
        if (src1 != src2) {
            //automatically unflip non-matching cards after 2 seconds
            unflipping = [id1, id2];
            visibleDeck[currIndices[0]] = 'images/question.png';
            visibleDeck[currIndices[1]] = 'images/question.png';
            timeOutTimer = setTimeout(() => {
                flipBack(id1, id2);
            }, 2000);
        }
        else {
            pairsFound += 1;
            isUnFlipping = false;

            
            matchAudio.play();

            //no need to unflip
            currIndices = [];
        }
        currPair = [];
    }

    sessionStorage.setItem(`${difficulty}Visible`, JSON.stringify(visibleDeck));
    sessionStorage.setItem(`${difficulty}Deck`, JSON.stringify(deck));
    sessionStorage.setItem(`${difficulty}Pair`, JSON.stringify(currPair));
    sessionStorage.setItem(`${difficulty}Moves`, moves);
    
    endGame();
}
const initBoard = () => {
    difficulty = sessionStorage.getItem("difficulty") ?? "easy";
    

    moves = sessionStorage.getItem(`${difficulty}Moves`) ?? 0;
    movesText.textContent = `Moves: ${moves}`;

    currPair = JSON.parse(sessionStorage.getItem(`${difficulty}Pair`)) ?? [];
    movesContainer.innerHTML = `
            <h2>Total Moves: ${localStorage.getItem("totalMoves")}</h2>
  <h2>Moves: ${moves}</h2>`
    
    if (sessionStorage.getItem(`${difficulty}Deck`)) {
        deck = JSON.parse(sessionStorage.getItem(`${difficulty}Deck`));
        visibleDeck = JSON.parse(sessionStorage.getItem(`${difficulty}Visible`));
        endGame();

    }
    else {
        if (difficulty == 'easy') {
            deck = ['images/apple.jpg', 'images/apple.jpg', 
    'images/lemon.avif', 'images/lemon.avif', 
    'images/orange.jpg', 'images/orange.jpg', 
    'images/pear.png', 'images/pear.png'];
    }
    else if (difficulty == 'medium') {
            deck = ['images/apple.jpg', 'images/apple.jpg', 
    'images/lemon.avif', 'images/lemon.avif', 
    'images/orange.jpg', 'images/orange.jpg', 
    'images/pear.png', 'images/pear.png', 
    'images/pineapple.png', 'images/pineapple.png', 
    'images/pomegranate.png', 'images/pomegranate.png',
    'images/banana.png', 'images/banana.png',
    'images/blueberry.png', 'images/blueberry.png',
    'images/coconut.jpg', 'images/coconut.jpg'];
    }
    else {
        deck = ['images/apple.jpg', 'images/apple.jpg', 
    'images/lemon.avif', 'images/lemon.avif', 
    'images/orange.jpg', 'images/orange.jpg', 
    'images/pear.png', 'images/pear.png', 
    'images/pineapple.png', 'images/pineapple.png', 
    'images/pomegranate.png', 'images/pomegranate.png',
    'images/banana.png', 'images/banana.png',
    'images/blueberry.png', 'images/blueberry.png', 
    'images/coconut.jpg', 'images/coconut.jpg', 
    'images/kiwi.png', 'images/kiwi.png',
    'images/watermelon.png', 'images/watermelon.png',
    'images/strawberry.png', 'images/strawberry.png'];
    }
    shuffleDeck(deck);
    visibleDeck = Array(deck.length).fill('images/question.png');
    }
}

const buildBoard = () => {

    main.innerHTML = '';
    
    initBoard();

    const pairs = deck.length/2;
    if (pairs <= 4) {
        main.style.gridTemplateColumns = 'repeat(4, 15%)';
        main.style.gridTemplateRows = 'repeat(2, minmax(45%, 50%))';
    }
    else if (pairs <= 9) {
        main.style.gridTemplateColumns = 'repeat(6, 10%)';
        main.style.gridTemplateRows = 'repeat(3, minmax(30%, 35%))';
    }
    else {
        main.style.gridTemplateColumns = 'repeat(8, 10%)';
        main.style.gridTemplateRows = 'repeat(3, minmax(30%, 35%))';
    }

    //initialize the card deck on the GUI and set up click event listener
for (let i = 0; i < deck.length; i++) {
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    let cardImage = document.createElement('img');
    cardImage.id = `card${i}`;
    cardImage.src = visibleDeck[i];

    cardContainer.append(cardImage);


    cardContainer.addEventListener('click', () => {
        if (!cardImage.classList.contains('flipping'))
        {
            flip(cardImage.id, cardContainer, i);
        }
        else {
            console.log('flipping');
        }
        
    });
    main.append(cardContainer);
}
}

const getDifficulty = (diff) => {
    if (unflipping[0] && unflipping[1]) {
        skipFlipBackTimer();
    }

    
    difficulty = diff;
    sessionStorage.setItem(`difficulty`, difficulty);
    buildBoard();
    return difficulty;
    
}
buildBoard();



//Gameplay Constants
let moves = 0;
let pairsFound = 0;
let currPair = [];
let difficulty = "easy";
let deck = ["images/apple.jpg", "images/apple.jpg", 
    "images/lemon.avif", "images/lemon.avif", 
    "images/orange.jpg", "images/orange.jpg", 
    "images/pear.png", "images/pear.png"];


//Unflip Constants
let isUnFlipping = false;
let timeOutTimer = null;
let unflipping = [];

//Initial page elements

let main = document.querySelector('.cardDeck');
let movesContainer = document.querySelector('#moves');
let movesText = document.querySelector('#moves h2')
let sidebar = document.querySelector('.sidebar');


const showInstructions = () => {
    
    const instructions = document.getElementById("instructions");
    const button = document.getElementById("instructionsButton");
    if (instructions.hidden) {
        instructions.hidden = false;

        button.textContent = "Hide Instructions";
    }
    else {
        instructions.hidden = true;

    const button = document.getElementById("instructionsButton");
    button.innerText = "Show Instructions";
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

    card1.src = "images/question.png"
    card2.src = "images/question.png"

    isUnFlipping = false;
    card1.classList.remove("flipping");
    card2.classList.remove("flipping");
}
//automatically unflips two unmatching cards if new card is flipped
const skipFlipBackTimer = () => {
    clearTimeout(timeOutTimer);
    flipBack(unflipping[0], unflipping[1]);

    //reset unflipping constants
    timeOutTimer = null;
    unflipping = [];
}

const endGame = () => {
    const winAudio = new Audio("audio/win.wav");
    winAudio.play();
    movesContainer.innerHTML = `
  <h1>YOU WIN!</h1>
  <h3>You used: ${moves} moves</h3>
`;  
}
//helper method for flipping a card over
const flip = (id, cardContainer, index) => {
    const flipAudio = new Audio('audio/flip.wav');
    flipAudio.currentTime = 0;
    flipAudio.play();

    setTimeout(() => {
        flipAudio.pause();
        flipAudio.currentTime = 0; 
    }, 180); 


    if (unflipping.length == 2) {
        skipFlipBackTimer();
    }
    
    let cardImage = document.querySelector(`#${id}`);
    cardImage.src = deck[index];
    cardImage.classList.add("flipping");
    
    cardContainer.append(cardImage);
    currPair.push(`#${id}`);

    //two cards are unflipped; check if match
    if (currPair.length == 2) {
        moves++;
        isUnFlipping = true;
        const id1 = currPair[0];
        const id2 = currPair[1];
        const src1 = document.querySelector(id1).src;
        const src2 = document.querySelector(id2).src;

        
        if (src1 != src2) {
            //automatically unflip non-matching cards after 2 seconds
            unflipping = [id1, id2];
            timeOutTimer = setTimeout(() => {flipBack(id1, id2)}, 2000);
        }
        else {
            pairsFound += 1;
            isUnFlipping = false;

            const matchAudio =  new Audio('audio/match.mp3');
            matchAudio.play();
        }
        currPair = [];
    }

    if (pairsFound == deck.length / 2) {
        endGame();
    }
    else {
        movesText.textContent = `Moves: ${moves}`;
    }
}

const buildBoard = () => {
    main.innerHTML = "";
    console.log(difficulty);
    if (difficulty == "easy") {
            deck = ["images/apple.jpg", "images/apple.jpg", 
    "images/lemon.avif", "images/lemon.avif", 
    "images/orange.jpg", "images/orange.jpg", 
    "images/pear.png", "images/pear.png"];
    }
    else if (difficulty == "medium") {
            deck = ["images/apple.jpg", "images/apple.jpg", 
    "images/lemon.avif", "images/lemon.avif", 
    "images/orange.jpg", "images/orange.jpg", 
    "images/pear.png", "images/pear.png", 
    "images/pineapple.png", "images/pineapple.png", 
    "images/pomegranate.png", "images/pomegranate.png",
    "images/banana.png", "images/banana.png",
    "images/blueberry.png", "images/blueberry.png",
    "images/coconut.jpg", "images/coconut.jpg"];
    }
    else {
        deck = ["images/apple.jpg", "images/apple.jpg", 
    "images/lemon.avif", "images/lemon.avif", 
    "images/orange.jpg", "images/orange.jpg", 
    "images/pear.png", "images/pear.png", 
    "images/pineapple.png", "images/pineapple.png", 
    "images/pomegranate.png", "images/pomegranate.png",
    "images/banana.png", "images/banana.png",
    "images/blueberry.png", "images/blueberry.png", 
    "images/coconut.jpg", "images/coconut.jpg", 
    "images/kiwi.png", "images/kiwi.png",
    "images/watermelon.png", "images/watermelon.png",
    "images/strawberry.png", "images/strawberry.png"];
    }

    shuffleDeck(deck);

    const pairs = deck.length/2;
    if (pairs <= 4) {
        main.style.gridTemplateColumns = "repeat(4, 15%)";
        main.style.gridTemplateRows = "repeat(2, minmax(45%, 50%))";
    }
    else if (pairs <= 9) {
        main.style.gridTemplateColumns = "repeat(6, 10%)";
        main.style.gridTemplateRows = "repeat(3, minmax(30%, 35%))";
    }
    else {
        main.style.gridTemplateColumns = "repeat(8, 10%)";
        main.style.gridTemplateRows = "repeat(3, minmax(30%, 35%))";
    }

    //initialize the card deck on the GUI and set up click event listener
for (let i = 0; i < deck.length; i++) {
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    let cardImage = document.createElement('img');
    cardImage.id = `card${i}`;
    cardImage.src = "images/question.png";

    cardContainer.append(cardImage);


    cardContainer.addEventListener("click", () => {
        if (!cardImage.classList.contains("flipping"))
        {
            flip(cardImage.id, cardContainer, i);
        }
        else {
            console.log("flipping");
        }
        
    });
    main.append(cardContainer);
}
}

const getDifficulty = (diff) => {
    difficulty = diff;
    buildBoard();
}
buildBoard();



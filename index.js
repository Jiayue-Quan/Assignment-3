//Gameplay Constants
let moves = 0;
let pairsFound = 0;
let currPair = []
let deck = ["images/apple.jpg", "images/apple.jpg", 
    "images/lemon.avif", "images/lemon.avif", "images/orange.jpg", "images/orange.jpg", "images/pear.png", "images/pear.png", ];

//Unflip Constants
let isUnFlipping = false;
let timeOutTimer = null;
let unflipping = [];

//Initial page elements
let main = document.querySelector('.cardDeck');
let movesText = document.querySelector('#moves');

//this is the fisher-yates algorithm for shuffling an array
const shuffleDeck = (deck) => {
    let currIndex = deck.length;

    while (currIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currIndex);
        currIndex--;

        [deck[currIndex], deck[randomIndex]] = [deck[randomIndex], deck[currIndex]];
    }
}

//initialize the game
shuffleDeck(deck);

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
    console.log(unflipping);
    clearTimeout(timeOutTimer);
    flipBack(unflipping[0], unflipping[1]);

    //reset unflipping constants
    timeOutTimer = null;
    unflipping = [];
}

const endGame = () => {
    movesText.textContent = `YOU WIN!\nYou used: ${moves} moves`
}
//helper method for flipping a card over
const flip = (id, cardContainer, index) => {
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


//initialize the card deck on the GUI and set up click event listener
for (let i = 0; i < 8; i++) {
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


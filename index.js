//Constants
let moves = 0;
let currPair = []

let pairsFound = 0;
let main = document.querySelector('.cardDeck');
let movesText = document.querySelector('#moves');

const flipBack = (id1, id2) => {
    const card1 = document.querySelector(id1);
    const card2 = document.querySelector(id2);

    card1.src = "images/question.png"
    card2.src = "images/question.png"

    card1.classList.remove("flipping");
    card2.classList.remove("flipping");
   
    
}

const flip = (id, cardContainer) => {
    let cardImage = document.querySelector(`#${id}`);
    cardImage.src = "images/orange.jpg"
    cardImage.classList.add("flipping");
    cardContainer.append(cardImage);
    currPair.push(`#${id}`);

    if (currPair.length % 2 == 0) {
        moves++;
        const id1 = currPair[0];
        const id2 = currPair[1];
        const src1 = document.querySelector(id1).src;
        const src2 = document.querySelector(id2).src;

        
        if (src1 == src2) {
            setTimeout(() => {flipBack(id1, id2)}, 2000);
        }
        else {
            pairsFound += 1;
        }
        currPair = [];
    }

    
    movesText.textContent = `Moves: ${moves}`

    
}

const iconList = [];

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
            flip(cardImage.id, cardContainer);
        }
        else {
            console.log("flipping");
        }
        
    });
    main.append(cardContainer);
}


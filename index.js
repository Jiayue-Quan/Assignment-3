let p = document.createElement('p');
p.textContent = "I'm new!";

let main = document.querySelector('.cardDeck');

const flip = () => {
    console.log("clickced");
}

const iconList = [];

for (let i = 0; i < 8; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.id = i;
    card.addEventListener("click", flip);
    main.append(card);
}
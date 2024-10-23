const cardsArray = [
    { name: "Harry Potter", img: "harry_potter.jpg" },
    { name: "The Hobbit", img: "the_hobbit.jpg" },
    { name: "1984", img: "1984.jpg" },
    { name: "To Kill a Mockingbird", img: "mockingbird.jpg" },
    { name: "Pride and Prejudice", img: "pride_prejudice.jpg" },
    { name: "Moby Dick", img: "moby_dick.jpg" },
    { name: "The Great Gatsby", img: "gatsby.jpg" },
    { name: "War and Peace", img: "war_peace.jpg" }
];

// Dubbla korten och blanda dem
const gameCards = [...cardsArray, ...cardsArray];
gameCards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('memory-game');

gameCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.setAttribute('data-name', card.name);

    cardElement.innerHTML = `
        <div class="front-face">Bok</div>
        <div class="back-face"><img src="${card.img}" alt="${card.name}"></div>
    `;

    gameBoard.appendChild(cardElement);
});

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Första klick
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Andra klick
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));

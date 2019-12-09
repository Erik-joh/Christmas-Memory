const cardsData = [
    {
        image: "/images/mistletoe.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/balls.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/giftbox.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/globe.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/hat.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/snowflake.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/snowman.png",
        backColor: "white",
        found: false,
        locked: false
    },
    {
        image: "/images/tree.png",
        backColor: "white",
        found: false,
        locked: false
    }
];
const gameField = document.querySelector(".game-field");
const resetButton = document.querySelector(".reset-button");
const easyButton = document.querySelector(".easy-button");
const normalButton = document.querySelector(".normal-button");
const hardButton = document.querySelector(".hard-button");
const pairsTotal = document.querySelector(".total-pairs");
const pairsDone = document.querySelector(".pairs-done");
const clicksDone = document.querySelector(".clicks-done");
const gameOver = document.querySelector(".game-over");

pairsDone.textContent = "0";
let isTurnedUp = false;
let lockClick = false;
let pairs = 0;
let lastCard = "";
let totalClicks = 0;

init();

function init() {
    //starts game in easy
    easyButton.addEventListener("click", () => {
        reset();
        createCards(randomizeArray(4));
        pairsTotal.textContent = "/ 4";
        start();
    });
    //starts game in normal
    normalButton.addEventListener("click", () => {
        reset();
        createCards(randomizeArray(6));
        pairsTotal.textContent = "/ 6";
        start();
    });
    //starts game in hard
    hardButton.addEventListener("click", () => {
        reset();
        createCards(randomizeArray(8));
        pairsTotal.textContent = "/ 8";
        start();
    });
    //resets the board
    resetButton.addEventListener("click", reset);
}
//start function which selects all cards and
//creates eventlistener for each card and calls on clickCard function.
function start() {
    const cardDivs = gameField.querySelectorAll(".flip-card");

    cardDivs.forEach(elem => {
        elem.addEventListener("click", function() {
            if (
                lockClick === false &&
                !elem.firstElementChild.classList.contains("click")
            ) {
                clickCard(elem);
                totalClicks++;
                clicksDone.textContent = `${totalClicks}`;
                if (checkIfWon(cardDivs)) {
                    gameOver.textContent = `Well done! you finnished in ${totalClicks} clicks!`;
                }
            }
        });
    });
}
//resets the board and all variables needed
function reset() {
    gameField.innerHTML = "";
    isTurnedUp = false;
    lockClick = false;
    lastCard = "";
    pairsDone.textContent = "0";
    pairs = 0;
    clicksDone.textContent = "0";
    totalClicks = 0;
    gameOver.textContent = "";
}

//takes a card and checks if it is clicked then
// if it is equal to lastcard clicked otherwise turns it back.
function clickCard(card) {
    if (!isTurnedUp) {
        card.locked = false;
        addClick(card);
        lastCard = card;
        isTurnedUp = true;
    } else if (lastCard.dataset.key === card.dataset.key) {
        addClick(card);
        isTurnedUp = false;
        card.dataset.found = true;
        lastCard.dataset.found = true;
        pairs++;
        pairsDone.textContent = `${pairs}`;
    } else {
        card.locked = true;
        addClick(card);
        lockClick = true;
        setTimeout(() => {
            removeClick(card);
            removeClick(lastCard);
            lockClick = false;
            isTurnedUp = false;
        }, 1000);
    }
}
//removes click class from an card
function removeClick(card) {
    return card.firstElementChild.classList.remove("click");
}
//adds click class to an card
function addClick(card) {
    return card.firstElementChild.classList.add("click");
}
//loops throu array and checks i all cards are found
function checkIfWon(cards) {
    for (let i = 0; i < cards.length - 1; i++) {
        const found = cards[i].dataset.found === "true";
        if (!found) {
            return false;
        }
    }
    return true;
}
//checks if two cards are equal
function checkIfEqual(first, second) {
    return first === second;
}
//creates a card array by duplicating each element from the cardData array
function createCardsArray(numberOfPairs) {
    y = numberOfPairs;
    const cardsArray = [];
    for (let i = 0; i < y; i++) {
        cardsArray.push(cardsData[i]);
        cardsArray.push(cardsData[i]);
    }
    return cardsArray;
}
//randomizes an array
function randomizeArray(numberOfPairs) {
    array = createCardsArray(numberOfPairs);
    for (let i = array.length - 1; i > 0; i--) {
        var x = Math.floor(Math.random() * (i + 1));
        var temp = array[x];
        array[x] = array[i];
        array[i] = temp;
    }
    return array;
}
//loops and appends all cards to gameField
function createCards(cards) {
    cards.forEach(card => {
        const elem = createCard(card.image, card.found);
        gameField.appendChild(stringToHTML(elem));
    });
}
//creates a card structure
function createCard(image, found) {
    return `<div class="flip-card" data-key="${image}" data-found="${found}">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <div></div>
            </div>
            <div class="flip-card-back">
            </div>
        </div>
        <div class="flip-card-content-outer">
            <div class="flip-card-content" style="background-image:url(${image})">
            </div>
        </div>
    </div>`;
}
//converts a string to html div
function stringToHTML(str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
}

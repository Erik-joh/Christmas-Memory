
const cardsData = [
    {color: "red", backColor: "white", found: false},
    {color: "green", backColor: "white", found: false},
    {color: "blue", backColor: "white", found: false},
    {color: "hotpink", backColor: "white", found: false},
    {color: "yellow", backColor: "white", found: false},
    {color: "orange", backColor: "white", found: false},
    {color: "black", backColor: "white", found: false},
    {color: "gray", backColor: "white", found: false}
];
const gameField = document.querySelector(".gameField");
const resetButton = document.querySelector('.resetButton');
const easyButton = document.querySelector('.easyButton');
const normalButton = document.querySelector('.normalButton');
const hardButton = document.querySelector('.hardButton');
let isTurnedUp = false;
let lockClick = false;
let lastCard;

init();

function init(){
    easyButton.addEventListener('click',()=>{
        reset();
        createCards(randomizeArray(4));
        start();
    });
    normalButton.addEventListener('click',()=>{
        reset();
        createCards(randomizeArray(6));
        start();
    });
    hardButton.addEventListener('click',()=>{
        reset();
        createCards(randomizeArray(8));
        start();
    });

    resetButton.addEventListener('click', reset);

}
function start(){

    const cardDivs = gameField.querySelectorAll('.flip-card');
    cardDivs.forEach(elem => {
        elem.addEventListener('click',function() {
            if(lockClick === false){
                clickCard(elem);
                if(checkIfWon(cardDivs)){console.log('Game Over!')}
            }
        });
    });

}

function reset(){
    gameField.innerHTML = '';
}
function clickCard(card){
    if(!isTurnedUp){
        addClick(card);
        lastCard = card;
        isTurnedUp = true;
    }else if(lastCard.dataset.key === card.dataset.key){
        addClick(card);
        isTurnedUp = false;
        card.dataset.found = true;
        lastCard.dataset.found = true;
    }else{
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
function removeClick(card){
    return card.firstElementChild.classList.remove('click');
}
function addClick(card){
    return card.firstElementChild.classList.add('click');
}
function checkIfWon(cards){
    for (let i = 0; i < cards.length-1; i++) {
        const found = cards[i].dataset.found === "true";
        if(!found){return false;}
    }
    return true;
}
function checkIfEqual(first,second){
    return first === second;
}



function createCardsArray(numberOfPairs){
    y = numberOfPairs;
    const cardsArray = [];
    for (let i= 0; i < y; i++) {
        cardsArray.push(cardsData[i]);
        cardsArray.push(cardsData[i]);
    }
    return cardsArray;
}
function randomizeArray(numberOfPairs) {
    array = createCardsArray(numberOfPairs);
    for (let i = array.length -1; i > 0; i--) {
        var x = Math.floor(Math.random() * (i+1));
        var temp = array[x];
        array[x] = array[i];
        array[i] = temp;
    }
    return array;
}

function createCards(cards){
    cards.forEach(card => {
        const elem = createCard(card.color, card.found);
        gameField.appendChild(stringToHTML(elem));
    });
}

function createCard(color,found){
    return `<div class="flip-card" data-key="${color}" data-found="${found}">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div style="width:100%;height:100%;background-color:white;"></div>
      </div>
      <div class="flip-card-back" style="background-color:${color};">
      </div>
    </div>
    </div>`;
}

function stringToHTML(str){
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
}

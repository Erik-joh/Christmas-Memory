const cardsArray = [
    ["red","blue","yellow","green"],
    ["blue","red","green","yellow"]
];
const gameField = document.querySelector(".gameField");

init();

function init(){
    createCards(cardsArray);
}

function createCards(cards){
    cards.forEach(row => {
        row.forEach(card => {
            console.log(createCard(card));
            const elem = createCard(card);
            console.log(stringToHTML(createCard(card)));
            console.log(stringToHTML(elem));
            gameField.appendChild(stringToHTML(elem));
        });
    });
}
function createCard(color){
    return `<div class="card" style="background-color:${color}">`;
}

function stringToHTML(str){
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
}

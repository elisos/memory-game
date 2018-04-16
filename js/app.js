/* *** *** *** *** *** VARIABLES *** *** *** *** *** */
const cardsUnique = [
    {
        id: 1,
        name: 'bear',
        img: 'img/bear.svg'
        },
    {
        id: 2,
        name: 'beaver',
        img: 'img/beaver.svg'
        },
    {
        id: 3,
        name: 'chick',
        img: 'img/chick.svg'
        },
    {
        id: 4,
        name: 'cat',
        img: 'img/cat.svg'
        },

    {
        id: 5,
        name: 'dog',
        img: 'img/dog.svg'
        },
    {
        id: 6,
        name: 'donkey',
        img: 'img/donkey.svg'
        },
    {
        id: 7,
        name: 'duck',
        img: 'img/duck.svg'
        },
    {
        id: 8,
        name: 'elephant',
        img: 'img/elephant.svg'
        },
    {
        id: 9,
        name: 'hen',
        img: 'img/hen.svg'
        },
    {
        id: 10,
        name: 'lion',
        img: 'img/lion.svg'
        },
    {
        id: 11,
        name: 'monkey',
        img: 'img/monkey.svg'
        },
    {
        id: 12,
        name: 'penguin',
        img: 'img/penguin.svg'
        },
    {
        id: 13,
        name: 'piggy',
        img: 'img/piggy.svg'
        },
    {
        id: 14,
        name: 'walrus',
        img: 'img/walrus.svg'
        },
    {
        id: 15,
        name: 'zebra',
        img: 'img/zebra.svg'
        },
    ];

//creating pairs by duplicating card array
const cards = cardsUnique
    .concat(cardsUnique);

const deck = document.querySelector('.deck'); //element which contains all cards
const card = document.querySelectorAll(".card"); // card element


let firstCard = ""; //first card clicked in a turn
let secondCard = ""; //second card clicked in a turn
let openCards = []; //array which holds open cards
let clicks = 0; //counts clicks on cards -> 2 clicks is one turn
let pairs = []; //counts matched pairs - > game finished when all 15 pairs are matched




/* *** *** *** *** *** FUNCTIONS *** *** *** *** *** */

/* *** *** SHUFFLE *** *** */
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(cards);

/* *** *** CREATE DECK *** *** */

// @description -> by iterating over cards array; it attaches the images and sets card's id attribute

function createDeck() {
    for (let i = 0; i < card.length; i++) {
        card[i].children.item(0).setAttribute("src", cards[i].img);
        card[i].setAttribute("id", cards[i].id);
    }
}
/* *** *** PLAY *** *** */
deck.addEventListener('click', play);

function play(clicked) {
    createDeck();

    if (clicked.target.nodeName == 'LI') {
        if (clicks < 2) {
            clicks++;
            if (clicks === 1) {
                firstCard = clicked.target;
                firstCard.classList.add("open");
                firstCard.classList.add("show");
                let cardId = clicked.target.getAttribute("id");
                openCards.push(cardId);


            } else if (clicks === 2) {
                secondCard = clicked.target;
                secondCard.classList.add("open");
                secondCard.classList.add("show");
                let cardId = clicked.target.getAttribute("id");
                openCards.push(cardId);

            }
        }

        if (openCards.length == 2) {
            checkIfMatch();
            starRating();
            countPairs();
            setTimeout(resetCards, 1200);
        }
        if (pairs.length === 15) {
            let score = starRating(moveCount).score;
            setTimeout(function () {
                endGame(moveCount, score);
            }, 500);
        }
    }
}



/* *** *** MATCH & UNMATCH *** *** */
function checkIfMatch() {
    if (openCards[0] == openCards[1]) {
        //* if the cards match *//
        match();

    } else {
        //* if the cards don't match *//

        setTimeout(unmatch, 1200);
        setTimeout(resetCards, 1200);
    }
}

/* *** *** MATCH Function *** *** */

function match() {

    let firstToPairs = firstCard.classList.add("match");
    pairs.push(firstToPairs);
    let secondToPairs = secondCard.classList.add("match");
    pairs.push(secondToPairs);
    openCards = [];
    clicks = 0;
}

/* *** *** UNMATCH Function *** *** */

function unmatch() {

    firstCard.classList.remove("open", "show");
    secondCard.classList.remove("open", "show");
    openCards = [];
    clicks = 0;
    console.log(firstCard, openCards[0], secondCard, openCards[1])
}

/* *** *** RESET  CARDS*** *** */
//resets all picked cards and starts counting clicks from 0

function resetCards() {
    firstCard = "";
    secondCard = '';
    clicks = 0;
}

/* *** *** REMOVE MATCH*** *** */
//removes all classes with open show match
function removeMatch() {
    for (i = 0; i < cards.length; i++) {
        card[i].classList.remove("open", "show", "match");
    }
}


/* *** *** TIMER *** *** */

const time = document.querySelector(".time");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let timer;
let totalTime = 0;

function startTimer() {
    timer = setInterval(function () {
        seconds.innerText++;
        if (seconds.innerText == 60) {
            minutes.innerText++;
            seconds.innerText = 0;
        }
    }, (1000));
    return timer;
}

function stopTimer() {
    clearInterval(timer);
}


/* *** *** STAR RATING & MOVE COUNTER *** *** */

const moves = document.querySelector(".moves"); // span elemet which displays number of moves
let moveCount = 0;
const star = document.querySelectorAll(".fa-star"); // star -represents rating

function starRating() {
    //update moves
    moveCount++;
    moves.innerText = moveCount;
    //start timer on first click
    if (moveCount == 1) {
        startTimer();
    }
    //rate game based on move count
    let rating = 3;
    if (moveCount == 20) {
        star[2].classList.remove("fa-star");
        star[2].classList.add("fa-star-o");
        rating = 2;
    } else if (moveCount == 30) {
        star[1].classList.remove("fa-star");
        star[1].classList.add("fa-star-o");
        rating = 1;
    }
    return {
        score: rating
    }
}

function resetStarRating() {
    star[1].classList.remove("fa-star-o");
    star[1].classList.add("fa-star");
    star[2].classList.remove("fa-star-o");
    star[2].classList.add("fa-star");
}


/* *** *** PAIRS COUNT *** *** */
const pairsNo = document.querySelector(".pairs"); // span elemet which displays number of pairs

function countPairs() {
    //update pairs
    let pairsCount = pairs.length / 2;
    pairsNo.innerText = pairsCount;
}


/* *** *** END GAME MODAL *** *** */

function endGame(moveCount, score) {
    stopTimer(timer);

    swal({
        closeOnEsc: true,
        closeOnClickOutside: true,
        title: "Game Won!",
        text: `Moves:  ${movesCount}
                Game rating : ${score}
                Time : ${minutes} : ${seconds}`,
        imageUrl: "img/unicorn.gif",
        button: {
            playAgain: {
                text: "Play again?"
            }
        },
    }).then(function (isConfirm) {
        if (isConfirm) {
            firstClick = false;
            gamePlay();
        }
    })
}

/* *** *** RESTART GAME *** *** */
let restart = document.getElementById("restart");

restart.addEventListener("click", restartGame);

function restartGame() {
    swal({
        closeOnEsc: true,
        closeOnClickOutside: true,
        title: "Are you sure you  want to start over ?",
        text: "Your progress will be lost!",
        icon: "warning",
        dangerMode: true,
        buttons: true
    }).then(function (isConfirm) {
        if (isConfirm) {
            stopTimer(timer);
            openCards = [];
            clicks = 0;
            play(clicked);
        }
    })
}



/* *** *** *** Instructions *** *** *** */


/* Create a list that holds all of your cards*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)

 function showCard(){}
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function addCardtoOpen(){}

 *  - if the list already has another card, check to see if the two cards match
 function checkIfMatch(){}
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 function matched(){}
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 function unmatched(){}

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 function countMoves(){}
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function endGame{}

function openModal{}

*/

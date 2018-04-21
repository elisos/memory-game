/* *** *** *** *** *** DECLARATIONS *** *** *** *** *** */
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
let pairs = []; //counts matched pairs - > game finished when all 15 pairs are matched
let openCards = []; //array which holds open cards
let pairedCards = document.getElementsByClassName("card open show match");
let matches = 0;


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
    createDeck();
    return array;
}
//shuffle(cards);

/* *** *** CREATE DECK *** *** */

// by iterating over cards array; it attaches the images and sets card's id attribute

function createDeck() {
    for (let i = 0; i < card.length; i++) {
        card[i].children.item(0).src = cards[i].img;
        card[i].dataset.id = cards[i].id;
    }
}

/* *** *** FLIP CARD *** *** */
// function takes event target (clicked) as an argument; checks if it's a card element, opens card and checks if cards match. If all 15 pairs are matched, it ends the game.

function flip(clicked) {

    if (!clicked.target.classList.contains('card')) return; // If the target isn't a card, stop the function

    if (openCards.length < 2) {
        clicked.target.classList.add("open", "show");
        openCards.push(clicked.target);
    }
    if (openCards.length == 2) {
        deck.removeEventListener('click', flip); // to stop from further clicking on cards until animation is finished
        checkMatch(openCards[0], openCards[1]);
    }

}



/* *** *** MATCH & UNMATCH COMPARISON *** *** */

function checkMatch(a, b) {
    setTimeout(function () {
        if (a.dataset.id == b.dataset.id) {
            //* if the cards match *//
            openCards[0].classList.add("match");
            openCards[1].classList.add("match");
            pairs.push(openCards[0]);
            pairs.push(openCards[1]);
            countPairs();
            if (++matches == 15) {
                setTimeout(endGame(), 500);
            }
        } else {
            openCards[0].classList.remove("open", "show");
            openCards[1].classList.remove("open", "show");
        }
        openCards = [];
        deck.addEventListener('click', flip)
    }, 750);
    starRating();
}


/* *** *** REMOVE MATCH*** *** */
//removes all classes with open show match
function removeMatch() {
    for (i = 0; i < cards.length; i++) {
        card[i].classList.remove("open", "show", "match");
    }
    matches = 0;
}


/* *** *** TIMER *** *** */

const time = document.querySelector(".time");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
const pause = document.getElementById("pause");
let paused = 0;
let stopped = 0;
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

function pauseTimer() {
    if (stopped == 0) {
        //pause
        if (paused == 0) {
            stopTimer();
            document.getElementById("pause").innerHTML = '<i class="fa fa-play"></i>';
            paused = 1;
            deck.removeEventListener('click', flip);
            for (let i = 0; i < card.length; i++) {
                card[i].classList.add("disabled");
            }
            swal({
                closeOnEsc: true,
                closeOnClickOutside: true,
                title: "Game Paused!",
                html: '<img src="bear-rotating.gif" alt="Bear loader" height="42" width="42">'
            });
            return;
        }
        //resume
        if (paused == 1) {
            startTimer();
            document.getElementById("pause").innerHTML = '<i class="fa fa-pause"></i>';
            paused = 0;
            deck.addEventListener('click', flip);
            for (let i = 0; i < card.length; i++) {
                card[i].classList.remove("disabled");
            }

            return;
        }
        return;
    }

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

/* *** *** *** *** *** MODALS *** *** *** *** *** */

/* *** *** GREETINGS MODAL *** *** */
window.onload = function () {
    swal({
        closeOnEsc: true,
        closeOnClickOutside: true,
        title: "Hi there!",
        text: `Welcome to our little ZOO!
We are playing hide and seek.
Help me to find my buddies! `,
        button: "LET'S PLAY",
        className: "swal-greetings"
    });
}

/* *** *** END GAME MODAL *** *** */

function endGame() {
    stopTimer(timer);
    let finalMoves = document.querySelector(".moves").innerHTML;
    let finalMin = document.querySelector(".minutes").innerHTML;
    let finalSec = document.querySelector(".seconds").innerHTML;
    let finalTime = finalMin + " min" + " : " + finalSec + " s";
    let finalRating = document.getElementsByClassName("fa-star").length;

    swal({
        closeOnEsc: true,
        closeOnClickOutside: true,
        title: "You Won!",
        text: `Here's how you did!
                Moves:  ${finalMoves}
                Time : ${finalTime}
                Game rating : ${finalRating} / 3`,
        className: "swal-endgame",
        button: "PLAY AGAIN"
    }).then(function (isConfirm) {
        if (isConfirm) {
            resetStarRating();
            openCards = [];
            removeMatch();
            matches = 0;
            shuffle(cards);
            flip();
        }
    })
}

/* *** *** RESTART GAME *** *** */
let restart = document.getElementById("restart");



function restartGame() {
    swal({
        closeOnEsc: true,
        closeOnClickOutside: true,
        title: "Do you want to start over?",
        text: "Your progress will be lost!",
        dangerMode: true,
        className: "swal-restart",
        buttons: true
    }).then(function (isConfirm) {
        if (isConfirm) {
            resetStarRating();
            openCards = [];
            removeMatch();
            matches = 0;
            shuffle(cards);
            flip();
        }
    })
}
/* *** *** *** *** *** EVENT LISTENERS *** *** *** *** *** */

// Event listener -> on click on deck, flip card
deck.addEventListener('click', flip);

// Event listener -> on click on pause/resume button -> stop or resume the game
pause.addEventListener("click", pauseTimer);

// Event listener -> on click on restart button ->restart the game
restart.addEventListener("click", restartGame);

// TEST engame
test.addEventListener("click", endGame);


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

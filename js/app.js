/*jQuery*/
$(document).ready(function () {

    /* *** *** *** *** *** VARIABLES *** *** *** *** *** */

    // Element with ID game -> save as variable
    const game = $('#game');


    // Array which holds cards with unique images -> half of deck
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

    const deck = $('<ul></ul>').addClass('deck');
    game.append(deck);

    let open = []; //array to hold selected cards per turn

    let firstCard = ''; // first selected card per turn
    let secondCard = ''; //second selected card per turn
    let count = 0; //counts moves per turn
    let previousTarget = null;


    let moves = $('.moves');

    /* *** *** *** *** *** FUNCTIONS *** *** *** *** *** */

    /* *** *** SHUFFLE *** *** */
    //Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /* *** *** DISPLAY CARDS *** *** */
    //  Display the cards on the page  - by iterating over cards array; creates .card li element and attaches it to .deck ul element

    function displayCards() {
        // *   - loop through each card and create its HTML
        for (const item of cards) {
            const {
                id,
                name,
                img
            } = item;

            //creates div with card class and adds the attribute data-name which will be basis to compare if two cards match
            const card = $('<li></li>').addClass('card');
            card.attr('data-name', item.name);


            //creates front-> unflipped and back
            // -> flipped, with image-  view of the card and
            const front = $('<div></div>').addClass('front');
            const back = $('<div></div>').addClass('back');
            let imageUrl = `url(${img})`;
            back.css('background-image', imageUrl);

            //*   - add each card's HTML to the page
            deck.append(card);
            card.append(front);
            card.append(back);
        }

        //before game starts shuffle the cards
        shuffle(cards);
    };



    /* *** *** GAME PLAY *** *** */
    //Function - Main game play



    function play() {
        //resets all the previous moves and empties deck
        deck.empty();
        movesCount = 0;
        moves.html(movesCount);



        //create new deck
        displayCards();
        //before game starts shuffle the cards
        shuffle(cards);
        //function to handle events on cards
        eventHandler();

        //reset timer after game ends

    };

    /* *** *** MATCH & UNMATCH FUNCTIONS *** *** */
    function checkIfMatch(firstCard, secondCard) {
        if (firstCard && secondCard) {
            if (firstCard === secondCard) {
                setTimeout(match, 1200);
            }
            setTimeout(unmatch, 1200);
        }
    }

    function match() {
        const selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('match');
            card.classList.add('open');
        });
    };

    function unmatch() {
        firstCard = '';
        secondCard = '';
        count = 0;
        previousTarget = 0;

        let selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
        });
    };

    /* *** *** MOVES COUNTER *** *** */

    const moves = document.querySelector(".moves");
    let countingMoves = 0;
    const star = document.querySelectorAll('.fa-star');
    const starOne = star[0];
    const starTwo = star[1];

    function starRemoval() {
        countingMoves++;
        moves.innerText = countingMoves;

        if (countingMoves == 1) {
            startTimer();
        }

        if (countingMoves == 10) {
            starOne.className += " hidden";

        } else if (countingMoves == 16) {
            starTwo.className += " hidden";
        }
    }
    /* *** *** STAR RATING *** *** */A


    /* *** *** TIMER *** *** */



    /* *** *** MODAL *** *** */

    /* *** *** RESET *** *** */
    const restart = $(".restart");
    restart.addEventListener("click", function buttonReset() {

        if (firstCard != "") {
            firstCard.classList.remove("open", "show")
        };
        removeMatch();

        resetCards();

        openedCards = [];
        countingMoves = 0;
        moves.innerText = 0;
        secondsLabel.innerHTML = 0;
        matchedCardsInArray = [];
        totalSeconds = 0;
        starOne.classList.remove("hidden");
        starTwo.classList.remove("hidden");
        clearInterval(interval);
        shuffle(fullDeck);


    })

    /* *** *** *** EVENT LISTENERS*** *** *** */
    //Event listener ->  if a card is clicked: display the card's symbol

    //Event listener ->  if a card is clicked: add the card to a *list* of "open" cards

    //Event listener ->   if the list already has another card, check to see if the two cards match

    // if the cards do match, lock the cards in the open position

    //Event listener ->   if the list already has another card, check to see if the two cards match

    //Event listener ->   if the list already has another card, check to see if the two cards match





    //Event listener -> on click flip the card
    function eventHandlers() {
        deck.on('click', event => {

            const clicked = event.target;

            if (
                clicked.nodeName === 'UL' ||
                clicked === previousTarget ||
                clicked.parentNode.classList.contains('selected')
            ) {
                return;
            }

            if (count < 2) {
                count++;
                if (count === 1) {
                    firstCard = clicked.parentNode.dataset.name;
                    console.log(firstCard);
                    clicked.parentNode.classList.add('selected');
                } else {
                    secondCard = clicked.parentNode.dataset.name;
                    console.log(secondCard);
                    clicked.parentNode.classList.add('selected');
                }

                checkIfMatch(firstCard, secondCard);
                previousTarget = clicked;
            }

        });
    }
    /* *** *** *** CALLING FUNCTIONS *** *** *** */
    play();


}); // end jQuery



/* *** *** *** Instructions *** *** *** */


/* Create a list that holds all of your cards*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 deck.on('click', function(){

 });
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

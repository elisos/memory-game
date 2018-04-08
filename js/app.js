/*jQuery*/
$(document).ready(function () {

    /* *** *** *** *** *** VARIABLES *** *** *** *** *** */

    // Element with ID game -> save as variable
    const game = $('#game');


    // Array which holds cards with unique images -> half of deck
    const cardsUnique = [{
            'name': 'baever',
            'img': 'img/baever.svg',
  },
        {
            'name': 'cat',
            'img': 'img/cat.svg',
  },
        {
            'name': 'chick',
            'img': 'img/chick.svg',
  },
        {
            'name': 'dog',
            'img': 'img/dog.svg',
  },
        {
            'name': 'donkey',
            'img': 'img/donkey.svg',
  },
        {
            'name': 'duck',
            'img': 'img/duck.svg',
  },
        {
            'name': 'elephant',
            'img': 'img/elephant.svg',
  },
        {
            'name': 'hen',
            'img': 'img/hen.svg',
  },
        {
            'name': 'lion',
            'img': 'img/lion.svg',
  },
        {
            'name': 'monkey',
            'img': 'img/monkey.svg',
  },
        {
            'name': 'penguin',
            'img': 'img/penguin.svg',
  },
        {
            'name': 'piggy',
            'img': 'img/piggy.svg',
  },
        {
            'name': 'bear',
            'img': 'img/bear.svg',
  },
        {
            'name': 'walrus',
            'img': 'img/walrus.svg',
  },
        {
            'name': 'zebra',
            'img': 'img/zebra.svg',
  },
];

    //creating pairs by duplicating card array
    const cards = cardsUnique
        .concat(cardsUnique);

    const deck = $('<ul></ul>').addClass('deck');
    game.append(deck);

    let selectedCards = []; //array to hold selected cards per turn
    let firstCard = ''; // first selected card per turn
    let secondCard = ''; //second selected card per turn
    let count = 0; //counts moves per turn
    let previousTarget = null;

    const time = $(".time");
    let minutes = $(".minutes");
    let seconds = $(".seconds");
    let timer;



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
        //before game starts shuffle the cards
        shuffle(cards);
        displayCards();

        //function to handle events on cards
        eventHandler();
        //reset timer after game ends
        resettimer = 0;
        seconds.innerText = 0;
        minutes.innerText = 0;
        stopTimer();

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


    /* *** *** STAR RATING *** *** */



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


    /* *** *** TIMER *** *** */



    /* *** *** MODAL *** *** */


    /* *** *** *** EVENT LISTENERS*** *** *** */
    //Event listener ->  if a card is clicked: display the card's symbol

    //Event listener ->  if a card is clicked: add the card to a *list* of "open" cards

    //Event listener ->   if the list already has another card, check to see if the two cards match

    // if the cards do match, lock the cards in the open position

    //Event listener ->   if the list already has another card, check to see if the two cards match

    //Event listener ->   if the list already has another card, check to see if the two cards match





    //Event listener -> on click flip the card
    function eventHandler() {
        deck.on('click', event => {

            const clicked = event.target;

            if (
                clicked.nodeName === 'UL' ||
                clicked === previousTarget ||
                clicked.parentNode.classList.contains('selected')
            ) {
                return;
            }
            //Start timer on first click on a card
            if (resettimer === 0) {
                startTimer();
                resettimer = 1;
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
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*jQuery*/
$(document).ready(function () {

    /* *** *** *** VARIABLES *** *** *** */

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






    /* *** *** *** FUNCTIONS *** *** *** */

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

    // display cards function - by iterating over cards array; creates .card list element and attaches it to deck
    const displayCards = function () {
        shuffle(cards);
        for (const item of cards) {
            const {
                name,
                img
            } = item;

            const card = $('<li></li>').addClass('card');
            card.attr('data-name', item.name);

            const front = $('<div></div>').addClass('front');
            const back = $('<div></div>').addClass('back');
            let imageUrl = `url(${img})`;
            back.css('background-image', imageUrl);

            deck.append(card);
            card.append(front);
            card.append(back);
        }
    };

    const play = function () {
        displayCards();
    };

    play();


}); // end jQuery



/* *** *** *** Instructions *** *** *** */


/* Create a list that holds all of your cards*/


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*
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

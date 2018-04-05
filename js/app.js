/*jQuery*/
$(document).ready(function () {
    // Element with ID game -> save as variable
    const game = $('#game');

    // Element with class deck -> save as variable
    const deck = $('.deck');

    // Array which holds cards images
    let cards = [
        {
            'name': 'baever',
            'img': 'img\baever.svg',
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
            'img': 'img\lion.svg',
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
    //intialize modal
    $(document).ready(function () {
        $('.modal').modal();
    });

    //Easy mode
    $("#pick-easy").on("click", function () {
        let cardsEasy = cards[0, 1, 2, 3];
        let deckEasy = cardsEasy.concat(cardsEasy);

        deckEasy.forEach(item => {
            // Create a div
            const card = document.createElement('div');

            // Apply a card class to that div

            card.classList.add('deck-card');
            card.classList.add('show');

            // Set the data-name attribute of the div to the cardsArray name
            card.dataset.name = item.name;

            // Apply the background image of the div to the cardsArray image
            card.style.backgroundImage = `url(${item.img})`;

            // Append the div to the grid section
            deck.append(card);
});


    });
    //Medium mode
    $("#pick-hard").on("click", function () {


    });

    //Hard mode
    $("#pick-hard").on("click", function () {


    });
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

// Create a list that holds all of your cards

let cardSymbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle"]
let visibleCard;
let firstCard;
let secondCard;
let matchCardnumber = 0;
let movescount = 0;
let stars = [document.querySelectorAll('.fa-star')];
let ratingvalue = 0;
let timercount = new Timer();

// console.log(timercount.getTimeValues().toString());
//console.log(stars);


//shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976

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

// add each card's HTML to the page
// loop through each card and create its HTML
// inspire by Ryan Waite
function generateGameBoard() {

    let cardItemList = shuffle(cardSymbols);
    //console.log(cardItemList);
    // for each syntx
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    cardItemList.forEach(function (cardClassName, index) {
        // console.log(id);

        // draw card in HTML like below 
        // <li class="card"><i class="fa fa-diamond"></i></li>
        // var element = document.createElement(tagName[, options]);

        let cardDeck = document.querySelector(".deck");
        let cardItem = document.createElement("li");

        // syntx to add class name
        // element.classList.add("mystyle");

        cardItem.setAttribute('id', index);
        cardItem.setAttribute('name', cardClassName);
        cardItem.classList.add("card");
        // set up the event listener for a card. If a card is clicked:
        cardItem.setAttribute('onclick', 'startGame(this)');

        let symbolsItem = document.createElement("i");
        symbolsItem.classList.add("fa");
        symbolsItem.classList.add(cardClassName);

        cardItem.appendChild(symbolsItem);
        cardDeck.appendChild(cardItem);
        // console.log(cardDeck);

    });

};

// creat faunction to match crds
function startGame(tempCard) {

    timer();

    tempCard.classList.add('open');
    tempCard.classList.add('show');

    // debugger;
    if (firstCard && secondCard) {
        //if null start to remove class open and show from first & scond card to can start from beging

        firstCard.classList.remove('open');
        firstCard.classList.remove('show');

        secondCard.classList.remove('open');
        secondCard.classList.remove('show');

        firstCard = null;
        secondCard = null;

    }
    //debugger;
    if (!visibleCard) {

        visibleCard = tempCard;
        movescount++;
        // console.log(movescount);
        
        moveCounter();
    } else {
        // Create object that's will have id and name
        let item = {
            id: tempCard.getAttribute('id'),
            name: tempCard.getAttribute('name')
        };

        if (checkMatchCard(item)) {

            tempCard.classList.add('match');
            tempCard.removeAttribute('onclick');

            visibleCard.classList.add('match');
            visibleCard.removeAttribute('onclick');

            matchCardnumber += 1;
            // console.log(matchCardnumber);

            // check if finshed game and user win 
            gameOver();
        }

        firstCard = tempCard;
        secondCard = visibleCard;
        visibleCard = null;

        // fire function clearSelectedCards () to can start click on new card
        clearSelectedCards();
    }
}

function checkMatchCard(item) {
    let card = {
        id: visibleCard.getAttribute('id'),
        name: visibleCard.getAttribute('name'),
        cardIsOpen: visibleCard.classList.contains('open')
    };

    return (item.name === card.name && item.id !== card.id && card.cardIsOpen);
}

// function to rmove class open and show from  cards [first and second card]
function clearSelectedCards() {
    setTimeout(() => {
        if (firstCard) {
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            firstCard = null;
        }

        if (secondCard) {
            secondCard.classList.remove('open');
            secondCard.classList.remove('show');
            secondCard = null;
        }
    }, 1000);
}


//Game over funcatio to check if user finshed game or no
function gameOver() {
    // debugger;/
    if (matchCardnumber == 1) {

        let modal = document.querySelector('.popup');
        let close = document.querySelector('.close');

        document.querySelector("#moves").textContent = movescount;
        document.querySelector("#rating").textContent = ratingvalue;
        document.querySelector('#timer').textContent = timercount.getTimeValues().toString();

        //   debugger;
        modal.style.display = "block";

        close.onclick = function () {
            modal.style.display = "none";
            location.reload()
        }
    }
}

// function to count moves
function moveCounter() {

    let movesContainer = document.querySelector('.moves');
    movesContainer.textContent = movescount;
    rating();
};


// Function to  play Again
function playAgain() {

    let restartbtn = document.querySelector('.restart');
    restartbtn.onclick = function () {
        location.reload();
    }

}

function rating() {
    // make for loop on starts list to can check 
    // if number of movement = 20 I'll remove first gold class
    // if number of movement = 25 I'll remove second gold class
    // if number of movement = 30 I'll remove third gold class
    //alert(3);
    // console.log(movescount);
    for (star of stars) {
        // console.log(star[1])
        if (movescount === 20) {
            star[2].classList.remove("gold-star");
            ratingvalue = "  Very Good " + 2;
        } else if (movescount === 25) {
            star[1].classList.remove("gold-star");
            ratingvalue = " Good " + 1;
        } else if (movescount === 30) {
            star[0].classList.remove("gold-star");
        } else if (movescount <= 19) {
            ratingvalue = " Excellent " + 3;
        }
    }

}

// funcation to track time for game

 function timer() {
   
    timercount.start();
    timercount.addEventListener('secondsUpdated', function (e) {

        let basicUsagetimer = document.querySelector('#basicUsage');
        basicUsagetimer.textContent = timercount.getTimeValues().toString();
    });

};



// fire function
generateGameBoard();
playAgain();




/*
 * set up the event listener for a card. If a card is clicked: [Done]
 *  - display the card's symbol (put this functionality in another function that you call from this one)[Done]
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)[Done]
 *  - if the list already has another card, check to see if the two cards match[Done]
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)[Done]
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)[Done]
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)[Done]
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)[Done]
 */
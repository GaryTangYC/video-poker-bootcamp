/*************************
 **** Global variable *****
 ***************************/
let deck = [];
let playerCards = [];
let cardNameTally = {};
let cardName;
let gameState = '';
let betPoints = 100;
let cardContainer = ['','','','',''];
let holdButton = ['','','','',''];
/*************************
 **** Generate deck *****
 ***************************/

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
    // Initialise an empty deck array
    const newDeck = [];
    // Initialise an array of the 4 suits in our deck. We will loop over this array.
    const suits = ["hearts", "diamonds", "clubs", "spades"];
  
    // Loop over the suits array
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
      // Store the current suit in a variable
      const currentSuit = suits[suitIndex];
  
      //create new card symbol based on suits
      let cardSymbol;
      let suitRank;
  
      if (currentSuit == "hearts") {
        cardSymbol = "♥️";
        suitRank = '3';
      } else if (currentSuit == "diamonds") {
        cardSymbol = "♦️";
        suitRank = '1';
      } else if (currentSuit == "club") {
        cardSymbol = "♣️";
        suitRank = '2';
      } else {
        cardSymbol = "♠️";
        suitRank = '4';
      }
  
      // Create new card color based on suits
      let cardColor;
  
      if (cardSymbol == "♣️" || cardSymbol == "♠️") {
        cardColor = "black";
      } else {
        cardColor = "red";
      }
  
      // Loop from 1 to 13 to create all cards for a given suit
      // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
      // This is an example of a loop without an array.
      for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
        // By default, the card name is the same as rankCounter
        let cardName = `${rankCounter}`;
        let shortName = `${rankCounter}`;
  
        // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
        if (cardName === "1") {
          cardName = "ace";
          shortName = "A";
        } else if (cardName === "11") {
          cardName = "jack";
          shortName = "J";
        } else if (cardName === "12") {
          cardName = "queen";
          shortName = "Q";
        } else if (cardName === "13") {
          cardName = "king";
          shortName = "K";
        }
  
        // Create a new card with the current name, suit, rank, suit symbol, color
        const cardInfo = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
          suitSymbol: cardSymbol,
          suitRank: suitRank,
          color: cardColor,
          displayName: shortName,
        };
  
        // Add the new card to the deck
        newDeck.push(cardInfo);
      }
    }
    // Return the completed card deck
    return newDeck;
  };
  
  // Generate card display based on linkages to CSS
  const makeCardDisplay = (cardInfo) => {
    const suit = document.createElement("div");
    suit.classList.add("suit", cardInfo.color);
    suit.innerText = cardInfo.suitSymbol;
  
    const name = document.createElement("div");
    name.classList.add(cardInfo.displayName, cardInfo.color);
    name.innerText = cardInfo.displayName;
  
    const card = document.createElement("div");
    card.classList.add("card");
  
    card.appendChild(name);
    card.appendChild(suit);
  
    return card;
  };


  const createGameBoard = () => {
    // Generate gameboard for CSS
    const gameBoard = document.createElement("div");
    gameBoard.classList.add('parent');
    gameBoard.setAttribute('id', 'parent');
    document.body.appendChild(gameBoard);
    
    // Generate display payout container
    const displayPayout = document.createElement("div");
    displayPayout.classList.add("child1");
    gameBoard.appendChild(displayPayout);

    // Generate display payout image
    const payoutImage = document.createElement("img");
    payoutImage.src = 'images/payout1.png'
    displayPayout.appendChild(payoutImage);

    // Generate center Display container
    const centerDisplay = document.createElement("div");
    centerDisplay.classList.add("child2");
    gameBoard.appendChild(centerDisplay);

    // Generate player UI container
    const playerUI = document.createElement("div");
    playerUI.classList.add("child3");
    gameBoard.appendChild(playerUI);

    // Generate card layout container
    const cardLayout = document.createElement("div");
    cardLayout.classList.add("card-layout");
    centerDisplay.appendChild(cardLayout);

    // Generate hold button container
    const buttonLayout = document.createElement("div");
    buttonLayout.classList.add("button-layout");
    centerDisplay.appendChild(buttonLayout);

    // Generate cardContainer to display card
    for (let i = 0; i < cardContainer.length; i++) {
      cardContainer[i] = document.createElement('div');
      cardContainer[i].setAttribute('id', 'card' + [i]);
      cardContainer[i].classList.add('card');
      cardLayout.appendChild(cardContainer[i]);
    }

    // Generate hold button for card selection in gameplay
    for (let i = 0; i < holdButton.length; i++) {
      holdButton[i] = document.createElement('button');
      holdButton[i].setAttribute('id', 'button' + [i]);
      holdButton[i].classList.add('hold-button');
      holdButton[i].innerHTML = 'Hold';
      buttonLayout.appendChild(holdButton[i]);
  }

  var button = document.querySelectorAll("button")[0];
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);
CSS Way (with jQuer
}

  // Generate 5 cards from deck as playerCards
  const generatePlayerCards = () => {
      for (let i = 0; i < 5; i += 1) {
          playerCards.push(deck.pop());
      }
  }


  // Generate a replace card function. 
        // *** to work on after settling game logic *** Probably form an array that return boolean values? true = replace while false = hold card (i.e: playerCard[0] = true; playerCard[1] = false, and if true to replace card)
  const replaceCard = () => {
    for (i = 0; i < 5; i += 1) {
        if (playerCards[i] == true) {
        playerCards[i].push(deck.pop());
        } else {
            break;
        }
    }
  };


/*************************
 **** Game logic *****
 ***************************/
 const playerHand = [  { rank: 2, suit: 'hearts', name: '2' },  { rank: 2, suit: 'diamonds', name: '2' },  { rank: 5, suit: 'spades', name: '5' },  { rank: 7, suit: 'spades', name: '7' },  { rank: 9, suit: 'hearts', name: '9' },];

 const tallyCards = (cardsInHand) => {
  for (let i = 0; i < playerHand.length; i += 1) { 
    cardName = playerHand[i].name;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
    }
 }
};
// for (cardName in cardNameTally) {  
//   console.log(`There are ${cardNameTally[cardName]} ${cardName}s in the hand`);  

tallyCards(playerHand);



 // Game initialize and player are dealt 5 cards

 // During first round, player get to choose to keep or replace any of the cards

 // During second round, player shown if they won based on first round choices

        // sortcards in array to do calcHand

        // calcHands function to run and get wincondition

/*********************
 **** Game INIT ******
 **********************/

  gameInit = () => {

    // Generate deck of cards function [To be appended to a button]
    deck = shuffleCards(makeDeck());
    // Generate player hands
    generatePlayerCards();
  
    }
  

  createGameBoard();
  gameInit();

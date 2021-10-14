/** ***********************
 **** Global variable *****
 ************************** */
let deck = [];
const playerCards = [];
const cardRankTally = {};
let cardRankOrder;
let cardDuplicates;
let cardSuitsOrder;
let cardWin = '';
const gameState = '';
const betPoints = 100;
// Variables for CSS
const cardContainer = ['', '', '', '', ''];
const holdButton = ['', '', '', '', ''];
/** ***********************
 **** Generate deck *****
 ************************** */

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
  const suits = ['H', 'D', 'C', 'S'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Create new card color based on suits
    let cardColor;

    if (suits === 'S' || suits === 'C') {
      cardColor = 'black';
    } else {
      cardColor = 'red';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      const shortName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, rank, suit symbol, color
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
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
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const createGameBoard = () => {
  // Generate gameboard for CSS
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('parent');
  gameBoard.setAttribute('id', 'parent');
  document.body.appendChild(gameBoard);

  // Generate display payout container
  const displayPayout = document.createElement('div');
  displayPayout.classList.add('child1');
  gameBoard.appendChild(displayPayout);

  // Generate display payout image
  const payoutImage = document.createElement('img');
  payoutImage.src = 'images/payout1.png';
  displayPayout.appendChild(payoutImage);

  // Generate center Display container
  const centerDisplay = document.createElement('div');
  centerDisplay.classList.add('child2');
  gameBoard.appendChild(centerDisplay);

  // Generate player UI container
  const playerUI = document.createElement('div');
  playerUI.classList.add('child3');
  gameBoard.appendChild(playerUI);

  // Generate bet container
  const betContainer = document.createElement('div');
  betContainer.classList.add('displayBox');
  betContainer.innerHTML = 'bet amount button';
  playerUI.appendChild(betContainer);

  // Generate display message container
  const displayMessage = document.createElement('div');
  displayMessage.classList.add('displayBox');
  displayMessage.innerHTML = 'Player Message shown here';
  playerUI.appendChild(displayMessage);

  // Generate credit container
  const creditContainer = document.createElement('div');
  creditContainer.classList.add('displayBox');
  creditContainer.innerHTML = 'Remaining credit here';
  playerUI.appendChild(creditContainer);

  // Generate card layout container
  const cardLayout = document.createElement('div');
  cardLayout.classList.add('card-layout');
  centerDisplay.appendChild(cardLayout);

  // Generate hold button container
  const buttonLayout = document.createElement('div');
  buttonLayout.classList.add('button-layout');
  centerDisplay.appendChild(buttonLayout);

  // Generate cardContainer to display card
  for (let i = 0; i < cardContainer.length; i += 1) {
    cardContainer[i] = document.createElement('div');
    cardContainer[i].setAttribute('id', `card${[i]}`);
    cardContainer[i].classList.add('card');
    cardLayout.appendChild(cardContainer[i]);
  }

  // Generate hold button for card selection in gameplay
  for (let i = 0; i < holdButton.length; i += 1) {
    holdButton[i] = document.createElement('button');
    holdButton[i].setAttribute('id', `button${[i]}`);
    holdButton[i].classList.add('hold-button');
    holdButton[i].innerHTML = 'Hold';
    buttonLayout.appendChild(holdButton[i]);
  }

  // let button = document.querySelectorAll("hold-button");
  // button.addEventListener(
  //   "click",
  //   function () {
  //     if (button.getAttribute("Hold") == button.innerHTML) {
  //       button.innerHTML = button.getAttribute("Swap");
  //     } else {
  //       button.setAttribute("Swap", button.innerHTML);
  //       button.innerHTML = button.getAttribute("Hold");
  //     }
  //   },
  //   false
  // );
};

// Generate 5 cards from deck as playerCards
const generatePlayerCards = () => {
  for (let i = 0; i < 5; i += 1) {
    playerCards.push(deck.pop());
  }
};

// Generate a replace card function.
// *** to work on after settling game logic *** Probably form an array that return boolean values? true = replace while false = hold card (i.e: playerCard[0] = true; playerCard[1] = false, and if true to replace card)
const replaceCard = () => {
  for (let i = 0; i < 5; i += 1) {
    if (playerCards[i] === true) {
      playerCards[i].push(deck.pop());
    } else {
      break;
    }
  }
};

/** ***********************
 **** Game logic *****
 ************************** */
const playerHand = [
  { rank: 4, suit: 'S', name: '8' },
  { rank: 3, suit: 'S', name: 'K' },
  { rank: 2, suit: 'D', name: 'Q' },
  { rank: 1, suit: 'S', name: 'Q' },
  { rank: 4, suit: 'S', name: 'K' },
];

// Generate cards order for calcHand comparison
const tallyCards = (playerHand) => {
  // Tally card suit order to compare win condition
  playerHandSuit = playerHand.map((card) => card.suit);
  console.log(playerHandSuit);
  // Store array as string to compare win condition
  cardSuitsOrder = Object.values(playerHandSuit).toString();

  // Sort cards in hand from min to max
  playerHand.sort((min, max) => min.rank - max.rank);
  console.log(playerHand);
  // Tally card duplicates order to compare win condition
  for (let i = 0; i < playerHand.length; i += 1) {
    cardName = playerHand[i].rank;
    if (!cardRankTally[playerHand[i].rank]) {
      cardRankTally[playerHand[i].rank] = 1;
    } else {
      cardRankTally[playerHand[i].rank] += 1;
    }    
  }

  // Store array as strings to compare win condition
  // cardRankTally.sort((min, max) => min.rank - max.rank)
  cardDuplicates = Object.values(cardRankTally).toString();

  playerHandRank = playerHand.map((card) => card.rank);
  cardRankOrder = Object.values(playerHandRank).toString();
};

// // Determine if card suits are the same
// const findCardSuits = (playerHand) => {

// };

// findCardSuits(playerHand);

const calcHand = (cardDuplicates, cardSuitsOrder, cardRankOrder) => {
  console.log(playerHandSuit);

  console.log(playerHand);
  console.log(cardDuplicates);
  console.log(cardSuitsOrder);
  console.log(cardRankOrder);
  if (cardDuplicates === '4,1' || cardDuplicates ===  '1,4') {
    console.log('fours of a kind');
  }
  else if (cardDuplicates === '3,1,1' || cardDuplicates ===  '1,1,3') {
    console.log('three of a kinds');
  }
  else if (cardDuplicates === '3,2' || cardDuplicates ===  '2,3') {
    console.log('full house');
  }
  else if (cardDuplicates === '2,2,1' || cardDuplicates ===  '1,2,2' || cardDuplicates === '2,1,2') {
    console.log('two pairs');
  }
  else if (cardDuplicates === '2,1,1,1' || cardDuplicates ===  '1,2,1,1' || cardDuplicates ===  '1,1,2,1' || cardDuplicates ===  '1,1,1,2') {
    if(cardRankOrder.includes('11,11') || cardRankOrder.includes('12,12') || cardRankOrder.includes('13,13') || cardRankOrder.includes('1,1')) {
    console.log('one pairs');
    } else {
      console.log('Pair but less than J');
    }
  }
  else if (cardSuitsOrder === 'H,H,H,H,H' || cardSuitsOrder ===  'D,D,D,D,D' || cardSuitsOrder ===  'S,S,S,S,S' || cardSuitsOrder === 'C,C,C,C,C') {
    if (cardRankOrder === '1,2,3,4,5' || cardRankOrder === '2,3,4,5,6' || cardRankOrder === '3,4,5,6,7' || cardRankOrder === '4,5,6,7,8' || cardRankOrder === '5,6,7,8,9' || cardRankOrder === '6,7,8,9,10' || cardRankOrder === '7,8,9,10,11' || cardRankOrder === '8,9,10,11,12' || cardRankOrder === '9,10,11,12,13') {
      console.log('straight flush')
    }
    else if(cardRankOrder === '1,10,11,12,13') {
      console.log('royal flush')
    }
    else {console.log('flush')}
  }
  else if (cardRankOrder === '1,2,3,4,5' || cardRankOrder === '2,3,4,5,6' || cardRankOrder === '3,4,5,6,7' || cardRankOrder === '4,5,6,7,8' || cardRankOrder === '5,6,7,8,9' || cardRankOrder === '6,7,8,9,10' || cardRankOrder === '7,8,9,10,11' || cardRankOrder === '8,9,10,11,12' || cardRankOrder === '9,10,11,12,13'|| cardRankOrder ===  '1,10,11,12,13')  {
    console.log('straight');
  }
  else{
    console.log('no winning card');
  }
};

tallyCards(playerHand);
calcHand(cardDuplicates, cardSuitsOrder, cardRankOrder);

// 1. Loop through player hands 2. See if there are any pairs of cards

// for (cardName in cardRankTally) {
//   console.log(`There are ${cardRankTally[cardName]} ${cardName}s in the hand`); }

// Game initialize and player are dealt 5 cards

// During first round, player get to choose to keep or replace any of the cards

// During second round, player shown if they won based on first round choices

// sortcards in array to do calcHand

// calcHands function to run and get wincondition

/** *******************
 **** Game INIT ******
 ********************* */

gameInit = () => {
  createGameBoard();

  // Generate deck of cards function [To be appended to a button]
  deck = shuffleCards(makeDeck());
  // Generate player hands
  generatePlayerCards();
};

gameInit();

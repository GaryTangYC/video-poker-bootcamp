/** ***********************
 **** Global variable *****
 ************************** */
let betAmount = 1;
let deck = [];
let playerCards = [];
let cardRankTally = {};
let cardRankOrder;
let cardDuplicates;
let cardSuitsOrder;
let didPlayerWin;
let cardWinMessage = '';
let displayMessage;
let winAmount;
let gameState = 'betMode';
let totalPoints = 5;
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

    // Loop from 1 to 13 to create all cards for a given suit
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 10, 11, 12, or 13, set cardName to preferred name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '10') {
        cardName = 'T';
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
      };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }
  // Return the completed card deck
  return newDeck;
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
  betContainer.innerHTML = 'Bet Station';
  playerUI.appendChild(betContainer);

  // Generate display message container
  const createdisplayMessage = document.createElement('div');
  createdisplayMessage.classList.add('displayBox');
  createdisplayMessage.setAttribute('id', 'messageBox');
  createdisplayMessage.innerHTML = 'Place your bets on the Bet Station to begin.';
  playerUI.appendChild(createdisplayMessage);
  displayMessage = document.getElementById('messageBox');

  // Generate credit container
  const creditContainer = document.createElement('div');
  creditContainer.classList.add('displayBox');
  creditContainer.setAttribute('id', 'total-credit');
  creditContainer.innerHTML = `Remaining points:${totalPoints}`;
  playerUI.appendChild(creditContainer);
  displayCredit = document.getElementById('total-credit');

  // Generate card layout container
  const cardLayout = document.createElement('div');
  cardLayout.classList.add('card-layout');
  centerDisplay.appendChild(cardLayout);

  // Generate swap button container
  const buttonLayout = document.createElement('div');
  buttonLayout.classList.add('button-layout');
  centerDisplay.appendChild(buttonLayout);

  // Generate Finalize Card button container
  const finalizeLayout = document.createElement('div');
  finalizeLayout.classList.add('finalize-layout');
  centerDisplay.appendChild(finalizeLayout);

  // Generate cardContainer to display card
  for (let i = 0; i < cardContainer.length; i += 1) {
    cardContainer[i] = document.createElement('img');
    cardContainer[i].setAttribute('id', `card${[i]}`);
    cardContainer[i].classList.add('card');
    cardLayout.appendChild(cardContainer[i]);
  }
  // Generate swap button for card selection in gameplay
  for (let i = 0; i < holdButton.length; i += 1) {
    holdButton[i] = document.createElement('button');
    holdButton[i].setAttribute('id', `button${[i]}`);
    holdButton[i].classList.add('swap-button');
    holdButton[i].innerHTML = 'Swap';
    buttonLayout.appendChild(holdButton[i]);
  }

  // Create Finalize Card Button
  const cardFinalButton = document.createElement('button');
  cardFinalButton.classList.add('final-button');
  cardFinalButton.setAttribute('id', 'final-button');
  cardFinalButton.innerHTML = 'Finalize Your Cards!';
  finalizeLayout.appendChild(cardFinalButton);

  // Create bet dropdown selection to select bet
  const betSelection = [0, 1, 2, 3, 4, 5];
  let betDropDownContainer;
  betDropDownContainer = document.createElement('select');
  betDropDownContainer.setAttribute('id', 'dropdown');
  betContainer.appendChild(betDropDownContainer);
  for (let i = 0; i < betSelection.length; i += 1) {
    const betOption = document.createElement('option');
    betOption.value = betSelection[i];
    betOption.text = betSelection[i];
    betDropDownContainer.appendChild(betOption);
  }

  // Create bet submit button
  const betSubmitButton = document.createElement('button');
  betSubmitButton.classList.add('submit-button');
  betSubmitButton.setAttribute('id', 'submit-button');
  betSubmitButton.innerHTML = 'Place Bet';
  betContainer.appendChild(betSubmitButton);
};

/** ***********************
 **** helper function*****
 ************************** */
// Generate 5 cards from deck as playerCards
const generatePlayerCards = () => {
  for (let i = 0; i < 5; i += 1) {
    playerCards.push(deck.pop());
  }
};

// Generate card image based on playerHands
const pushCardImage = (playerHand) => {
  const card0 = document.getElementById('card0');
  const card1 = document.getElementById('card1');
  const card2 = document.getElementById('card2');
  const card3 = document.getElementById('card3');
  const card4 = document.getElementById('card4');
  card0.src = `cards/${playerHand[0].name}${playerHand[0].suit}.svg`;
  card1.src = `cards/${playerHand[1].name}${playerHand[1].suit}.svg`;
  card2.src = `cards/${playerHand[2].name}${playerHand[2].suit}.svg`;
  card3.src = `cards/${playerHand[3].name}${playerHand[3].suit}.svg`;
  card4.src = `cards/${playerHand[4].name}${playerHand[4].suit}.svg`;
};

// Generate a replace card action for each swap button into the respective playerCards array

const replaceCard0 = () => {
  playerCards.splice(0, 1, deck.pop());
};

const replaceCard1 = () => {
  playerCards.splice(1, 1, deck.pop());
};

const replaceCard2 = () => {
  playerCards.splice(2, 1, deck.pop());
};

const replaceCard3 = () => {
  playerCards.splice(3, 1, deck.pop());
};

const replaceCard4 = () => {
  playerCards.splice(4, 1, deck.pop());
};

// Add button functionality on click to swap card and can be click only once

const swapCard0 = () => {
  document.getElementById('button0').innerHTML = '💸';
  document.getElementById('button0').disabled = true;
  replaceCard0();
  pushCardImage(playerCards);
};

const swapCard1 = () => {
  document.getElementById('button1').innerHTML = '💸';
  document.getElementById('button1').disabled = true;
  replaceCard1();
  pushCardImage(playerCards);
};

const swapCard2 = () => {
  document.getElementById('button2').innerHTML = '💸';
  document.getElementById('button2').disabled = true;
  replaceCard2();
  pushCardImage(playerCards);
};

const swapCard3 = () => {
  document.getElementById('button3').innerHTML = '💸';
  document.getElementById('button3').disabled = true;
  replaceCard3();
  pushCardImage(playerCards);
};

const swapCard4 = () => {
  document.getElementById('button4').innerHTML = '💸';
  document.getElementById('button4').disabled = true;
  replaceCard4();
  pushCardImage(playerCards);
};

// Store all swap button functionality for ease of call
const swapCardsButton = () => {
  document.getElementById('button0').addEventListener('click', swapCard0);
  document.getElementById('button1').addEventListener('click', swapCard1);
  document.getElementById('button2').addEventListener('click', swapCard2);
  document.getElementById('button3').addEventListener('click', swapCard3);
  document.getElementById('button4').addEventListener('click', swapCard4);
};

// Display message of player UI & wins or loss
const displayOutput = () => {
  console.log('display message running');
  // if (gameState === 'betMode') {
  //   document.getElementById('messageBox').innerHTML = 'Place your bets on the Bet Station to begin.';
  // }
  if (didPlayerWin === true) {
    displayMessage.innerHTML = `Congratulations! <br> ${cardWinMessage} <br> You have won ${winAmount} Points! <br> Place your bet to play a new round`;
    displayCredit.innerHTML = `Remaining points:${totalPoints}`;
  }
  else {
    document.getElementById('messageBox').innerHTML = 'Unfortunately there are no winning cards. <br> Place your bet to play a new round.';
    displayCredit.innerHTML = `Remaining points:${totalPoints}`;
  }
};

// Reset variables after end of round and re-enable betRound buttons
const resetRound = () => {
  cardDuplicates = '';
  cardSuitsOrder = '';
  cardRankOrder = '';
  gameState = 'betMode';
  deck = [];
  playerCards = [];
  cardRankTally = {};
  didPlayerWin = null;
  cardWinMessage = '';
  // Re-enable bet buttons selection
  document.getElementById('dropdown').disabled = false;
  document.getElementById('submit-button').disabled = false;

  // Reset swap buttons
  for (let i = 0; i <= 4; i += 1) {
    document.getElementById(`button${i}`).innerHTML = 'Swap';
  }
};

// Generate betRound function for ease of call
const betRound = () => {
  // Disable all swap button and finalize card button
  for (let i = 0; i <= 4; i += 1) {
    document.getElementById(`button${i}`).disabled = true;
  }
  document.getElementById('final-button').disabled = true;

  // Choose bet amount and locking it with the submit button
  const betSubmitButton = document.getElementById('dropdown');
  betSubmitButton.onchange = function () {
    betAmount = betSubmitButton.value;
    betAmount = Number(betAmount);
    console.log(betAmount);
    if (betAmount === 0) {
      displayMessage.innerHTML = 'Please select a bet value';
      document.getElementById('submit-button').disabled = true;
    } else if (betAmount > totalPoints) {
      displayMessage.innerHTML = 'Please select a bet value that\'s less than your remaining points';
      document.getElementById('submit-button').disabled = true;
      document.getElementById('submit-button')
        .addEventListener('click', '');
    } else {
      document.getElementById('submit-button')
        .addEventListener('click', firstRound);
      document.getElementById('submit-button').disabled = false;
    }
  };
  // Check if bet amount is not more than existing credit before allowing to transit to firstRound
};

// Switch mode to firstRound after bet mode
const firstRound = () => {
  displayMessage.innerHTML = 'Swap and finalize your cards above <br> ';
  // Less betAmount from remaing points and update display
  totalPoints -= betAmount;
  document.getElementById('total-credit').innerHTML = `Remaining points:${totalPoints}`;

  // Disable submit-button
  document.getElementById('submit-button').disabled = true;

  // Disable bet buttons selection
  document.getElementById('dropdown').disabled = true;
  document.getElementById('final-button').disabled = true;

  // Switch game to round 1
  gameState = 'round1';
  // Generate play cards for hand and display card image
  deck = shuffleCards(makeDeck());
  generatePlayerCards();
  pushCardImage(playerCards);

  // Re-enabling all swap and finalize button during subsequent play
  for (let i = 0; i <= 4; i += 1) {
    document.getElementById(`button${i}`).disabled = false;
  }
  document.getElementById('final-button').disabled = false;
  // add the swap card functionality to the swap card button
  swapCardsButton();

  document
    .getElementById('final-button')
    .addEventListener('click', finalShowdown);
};

const finalShowdown = () => {
  gameState = 'showdown';
  // Disable all swap button to lock in cards
  for (let i = 0; i <= 4; i += 1) {
    document.getElementById(`button${i}`).disabled = true;
  }
  // Run function to tally cards against win condition
  tallyCards(playerCards);
  calcHand(cardDuplicates, cardSuitsOrder, cardRankOrder);

  // Reset variables for next game
  resetRound();

  // Check if total points less than 0 than game over
  if (totalPoints <= 0) {
    displayMessage.innerHTML = 'Game Over!! <br> Please refresh to play a new round.';
    // Disable bet buttons & finalize button selection
    document.getElementById('dropdown').disabled = true;
    document.getElementById('submit-button').disabled = true;
    document.getElementById('final-button').disabled = true;
  } else {
  // Re-initialize betting stage for next round
    gameState = 'betMode';
    betRound();
  }
};

/** ***********************
 ****** Game flow *******
 ************************** */
const gameStart = () => {
  if (gameState === 'betMode') {
    betRound();
  }
};

/** ***********************
 **** Game logic *****
 ************************** */
// const playerHand = [
//   { rank: 1, suit: 'S', name: '8' },
//   { rank: 13, suit: 'S', name: 'K' },
//   { rank: 12, suit: 'S', name: 'Q' },
//   { rank: 10, suit: 'S', name: 'Q' },
//   { rank: 11, suit: 'S', name: 'K' },
// ];

// Generate cards order for calcHand comparison
const tallyCards = (playerHand) => {
  // Tally card suit order to compare win condition
  const playerHandSuit = playerHand.map((card) => card.suit);
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
  cardDuplicates = Object.values(cardRankTally).toString();
  const playerHandRank = playerHand.map((card) => card.rank);
  cardRankOrder = Object.values(playerHandRank).toString();
};

const calcHand = (cardDuplicates, cardSuitsOrder, cardRankOrder) => {
  gameState = 'betMode';
  console.log(playerCards);
  console.log(cardDuplicates);
  console.log(cardSuitsOrder);
  console.log(cardRankOrder);
  if (cardDuplicates === '4,1' || cardDuplicates === '1,4') {
    console.log('fours of a kind');
    didPlayerWin = true;
    cardWinMessage = 'It\'s a 4 of a Kind!';
    winAmount = betAmount * 30;
    totalPoints += winAmount + betAmount;
    displayOutput();
  } else if (
    cardDuplicates === '3,1,1'
    || cardDuplicates === '1,1,3'
    || cardDuplicates === '1,3,1'
  ) {
    console.log('three of a kinds');
    didPlayerWin = true;
    cardWinMessage = 'It\'s a 3 of a Kind!';
    winAmount = betAmount * 3;
    totalPoints += winAmount + betAmount;
    displayOutput();
  } else if (cardDuplicates === '3,2' || cardDuplicates === '2,3') {
    console.log('full house');
    didPlayerWin = true;
    cardWinMessage = 'It\'s a full house!';
    winAmount = betAmount * 6;
    totalPoints += winAmount + betAmount;
    displayOutput();
  } else if (
    cardDuplicates === '2,2,1'
    || cardDuplicates === '1,2,2'
    || cardDuplicates === '2,1,2'
  ) {
    console.log('two pairs');
    didPlayerWin = true;
    cardWinMessage = 'It\'s 2 Pairs!';
    winAmount = betAmount * 2;
    totalPoints += winAmount + betAmount;
    displayOutput();
  } else if (
    cardDuplicates === '2,1,1,1'
    || cardDuplicates === '1,2,1,1'
    || cardDuplicates === '1,1,2,1'
    || cardDuplicates === '1,1,1,2'
  ) {
    if (
      cardRankOrder.includes('11,11')
      || cardRankOrder.includes('12,12')
      || cardRankOrder.includes('13,13')
      || cardRankOrder.includes('1,1')
    ) {
      console.log('one pairs');
      didPlayerWin = true;
      cardWinMessage = 'It\'s a Pair (J Or Better)!';
      winAmount = betAmount;
      totalPoints += winAmount + betAmount;
      displayOutput();
    } else {
      console.log('Pair but less than J');
      didPlayerWin = false;
      cardWinMessage = 'Unfortunately there are no winning cards.';
      // Not required to less off bet as it has been reduced from remaining points
      displayOutput();
    }
  } else if (
    cardSuitsOrder === 'H,H,H,H,H'
    || cardSuitsOrder === 'D,D,D,D,D'
    || cardSuitsOrder === 'S,S,S,S,S'
    || cardSuitsOrder === 'C,C,C,C,C'
  ) {
    if (
      cardRankOrder === '1,2,3,4,5'
      || cardRankOrder === '2,3,4,5,6'
      || cardRankOrder === '3,4,5,6,7'
      || cardRankOrder === '4,5,6,7,8'
      || cardRankOrder === '5,6,7,8,9'
      || cardRankOrder === '6,7,8,9,10'
      || cardRankOrder === '7,8,9,10,11'
      || cardRankOrder === '8,9,10,11,12'
      || cardRankOrder === '9,10,11,12,13'
    ) {
      console.log('straight flush');
      didPlayerWin = true;
      cardWinMessage = 'It\'s a Straight Flush!';
      winAmount = betAmount * 50;
      totalPoints += winAmount + betAmount;
      displayOutput();
    } else if (cardRankOrder === '1,10,11,12,13') {
      console.log('royal flush');
      didPlayerWin = true;
      cardWinMessage = 'It\'s a Royal Flush!!!!';
      if (betAmount == 5) {
        winAmount = betAmount * 800;
        totalPoints += winAmount + betAmount;
        displayOutput();
      } else {
        winAmount = betAmount * 250;
        totalPoints += winAmount + betAmount;
        displayOutput();
      }
    } else {
      console.log('flush');
      didPlayerWin = true;
      cardWinMessage = 'It\'s a Flush!';
      winAmount = betAmount * 5;
      totalPoints += winAmount + betAmount;
      displayOutput();
    }
  } else if (
    cardRankOrder === '1,2,3,4,5'
    || cardRankOrder === '2,3,4,5,6'
    || cardRankOrder === '3,4,5,6,7'
    || cardRankOrder === '4,5,6,7,8'
    || cardRankOrder === '5,6,7,8,9'
    || cardRankOrder === '6,7,8,9,10'
    || cardRankOrder === '7,8,9,10,11'
    || cardRankOrder === '8,9,10,11,12'
    || cardRankOrder === '9,10,11,12,13'
    || cardRankOrder === '1,10,11,12,13'
  ) {
    console.log('straight');
    didPlayerWin = true;
    cardWinMessage = 'It\'s a Straight!';
    winAmount = betAmount * 4;
    totalPoints += winAmount + betAmount;
    displayOutput();
  } else {
    console.log('no winning card');
    didPlayerWin = false;
    // Not required to less off bet as it has been reduced from remaining points
    displayOutput();
  }
};

/** *******************
 **** Game INIT ******
 ********************* */

gameInit = () => {
  createGameBoard();
  gameStart();
};

gameInit();

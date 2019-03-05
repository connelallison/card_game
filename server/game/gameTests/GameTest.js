const GamePlayer = require("../GamePlayer.js");
const Game = require("../Game.js");
const Cards = require("../CardLib");
const Card = require("../Card.js");
const Minion = require("../Minion.js");
const Spell = require("../Spell.js");
const { Deck, deck1, deck2 } = require("../Deck.js");

const testGame = new Game(deck1, deck2, true);

// console.log("Player 1 board: ");
// // console.log(testGame.player1.board.length);
// console.log(testGame.player1.board);
// console.log("\nPlayer 2 board: ");
// // console.log(testGame.player2.board.length);
// console.log(testGame.player2.board);
// console.log("\nPlayer 1 hand: ");
// // console.log(testGame.player1.hand.length);
// console.log(testGame.player1.hand);
// console.log("\nPlayer 2 hand: ");
// // console.log(testGame.player2.hand.length);
// console.log(testGame.player2.hand);
// // console.log("\nPlayer 1 deck: ");
// // console.log(testGame.player1.deck.length);
// // console.log(testGame.player1.deck);
// // console.log("\nPlayer 2 deck: ");
// // console.log(testGame.player2.deck.length);
// // console.log(testGame.player2.deck);
// // console.log(testGame.allActive());
// // setTimeout(testGame.activePlayer.playableCards.bind(testGame.activePlayer), 1000);
console.log("\nPlayer 1 Minion attack targets:");
console.log(testGame.player1.board[0].attackTargets());
// console.log("\nPlayer 2 Minion attack targets:");
// console.log(testGame.player2.board[0].attackTargets());
console.log("\nPlayer 1 Minion can attack: ")
testGame.player1.board[0].canAttack();
setTimeout(console.log, 12000, "\nPlayer 1 Minion can attack: ");
setTimeout(testGame.player1.board[0].canAttack.bind(testGame.player1.board[0]), 12000);

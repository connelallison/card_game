const GamePlayer = require("../game/GamePlayer.js");
const Card = require("../game/Card.js");
const Minion = require("../game/Minion.js");
const Spell = require("../game/Spell.js");

const testPlayer = new GamePlayer("testPlayer");
for (let i = 0; i < 10; i++) {
  const card = new Minion(`testMinion ${i}`, 0, 1, 1);
  testPlayer.deck.push(card);
  card.zone = "deck";
}
for (let i = 0; i < 10; i++) {
  const card = new Spell(`testSpell ${i}`, 0);
  testPlayer.deck.push(card);
  card.zone = "deck";
}
testPlayer.shuffle(testPlayer.deck);
testPlayer.myTurn = true;

// console.log("Board: " + testPlayer.board.length);
// console.log("Hand: " + testPlayer.hand.length);
// console.log("Deck: " + testPlayer.deck.length);
testPlayer.draw();
testPlayer.draw();
testPlayer.draw();
testPlayer.draw();
testPlayer.draw();
testPlayer.draw();
testPlayer.draw();
// console.log(testPlayer.hand[0]);
// console.log(testPlayer.hand[1]);
// console.log(testPlayer.hand[2]);
// console.log(testPlayer.hand[3]);
// console.log(testPlayer.hand[4]);
// console.log("Board: " + testPlayer.board.length);
// console.log("Hand: " + testPlayer.hand.length);
// console.log("Deck: " + testPlayer.deck.length);
console.log(testPlayer.hand);
// console.log(testPlayer.hand[0]);
console.log('\n playing \n');
testPlayer.play(testPlayer.hand[0]);
// console.log(testPlayer.hand[0]);
// console.log(testPlayer.hand);
testPlayer.play(testPlayer.hand[0]);
// console.log(testPlayer.hand[0]);
// console.log(testPlayer.hand);
// console.log(testPlayer.board);
console.log("Board: " + testPlayer.board.length);
console.log("Hand: " + testPlayer.hand.length);
console.log("Deck: " + testPlayer.deck.length);

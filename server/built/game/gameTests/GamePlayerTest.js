var GamePlayer = require('../game/GamePlayer');
var Card = require('../game/Card');
var Minion = require('../game/Minion');
var Spell = require('../game/Spell');
var testPlayer = new GamePlayer('testPlayer');
for (var i = 0; i < 10; i++) {
    var card = new Minion("testMinion " + i, 0, 1, 1);
    testPlayer.deck.push(card);
    card.zone = 'deck';
}
for (var i = 0; i < 10; i++) {
    var card = new Spell("testSpell " + i, 0);
    testPlayer.deck.push(card);
    card.zone = 'deck';
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
console.log('Board: ' + testPlayer.board.length);
console.log('Hand: ' + testPlayer.hand.length);
console.log('Deck: ' + testPlayer.deck.length);

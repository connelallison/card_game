const Card = require("./Card.js");
const Minion = require("./Minion.js");
const Spell = require("./Spell.js");
const { create } = require("./CardLib");

class Deck {
  constructor(playerName, cards=[]) {
    this.playerName = playerName;
    this.cards = cards;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this.cards;
  }
}


const deck1 = new Deck("player1");

for (let i = 1; i < 15; i++) {
  const card = create("Footman");
  deck1.cards.push(card);
  card.zone = "deck";
}
for (let i = 1; i < 7; i++) {
  const card = create("Fireburst");
  deck1.cards.push(card);
  card.zone = "deck";
}

const deck2 = new Deck("player2");

for (let i = 1; i < 16; i++) {
  const card = create("JuniorOrc");
  deck2.cards.push(card);
  card.zone = "deck";
}
for (let i = 1; i < 6; i++) {
  const card = create("Fireburst");
  deck2.cards.push(card);
  card.zone = "deck";
}

const DeckLib = { Deck: Deck, deck1: deck1, deck2: deck2 };

module.exports = DeckLib;

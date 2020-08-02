// const Card = require("./Card");
// const Minion = require("./Minion");
// const Spell = require("./Spell");
const { create } = require('./CardLib')

class Deck {
  constructor (game, owner, deckID, deckName, cards) {
    this.game = game
    this.owner = owner
    this.id = deckID
    this.name = deckName
    this.cards = cards.map(cardID => create(this.game, this.owner, 'deck', cardID))
    this.shuffle()
  }

  shuffle () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }
}

module.exports = Deck

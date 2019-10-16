// const Card = require("./Card.js");
// const Minion = require("./Minion.js");
// const Spell = require("./Spell.js");
const { create } = require('./CardLib.js')

class Deck {
  constructor (deckID, deckName, player = null, cards = []) {
    this.id = deckID
    this.name = deckName
    this.owner = player
    this.cards = cards
    this.assignOwnerAndZone()
    this.shuffle()
  }

  assignOwnerAndZone () {
    console.log(this.cards)
    this.cards.forEach((card) => {
      card.owner = this.owner
      card.zone = 'deck'
    })
  }

  shuffle () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
    return this.cards
  }
}

module.exports = Deck

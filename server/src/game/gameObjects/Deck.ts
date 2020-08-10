// const Card = require("./Card");
// const Minion = require("./Minion");
import Cards from '../dictionaries/Cards'
import Game from '../Game'
import GamePlayer from './GamePlayer'
import Card from './Card'

class Deck {
  game: Game
  owner: GamePlayer
  id: string
  name: string
  cards: Card[]

  constructor (game, owner, deckID, deckName, cards) {
    this.game = game
    this.owner = owner
    this.id = deckID
    this.name = deckName
    this.cards = cards.map(cardID => new Cards[cardID](this.game, this.owner, 'deck'))
    this.shuffle()
  }

  shuffle () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }
}

export default Deck

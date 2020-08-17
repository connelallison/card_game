// const Card = require("./Card");
// const Unit = require("./Unit");
import Cards from '../dictionaries/Cards'
import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import Card from './Card'
import DeckObject from '../structs/DeckObject'
import Leader from './Leader'
import Passive from './Passive'

class Deck {
  game: Game
  owner: GamePlayer
  id: string
  name: string
  leader: Leader
  passive: Passive
  cards: Card[]

  constructor (game, owner, deckID, deckName, deck: DeckObject) {
    this.game = game
    this.owner = owner
    this.id = deckID
    this.name = deckName
    this.leader = new Cards[deck.leader](this.game, this.owner, 'setAside')
    this.passive = new Cards[deck.passive](this.game, this.owner, 'setAside')
    this.cards = deck.cards.map(cardID => new Cards[cardID](this.game, this.owner, 'deck'))
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

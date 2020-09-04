class Deck {
  game: Game
  owner: GamePlayer
  id: string
  name: string
  leader: Leader
  leaderTechnique: LeaderTechnique
  passive: Passive
  cards: Card[]

  constructor (game, owner, deckID, deckName, deck: DeckObject) {
    this.game = game
    this.owner = owner
    this.id = deckID
    this.name = deckName
    this.leader = this.game.createCard(deck.leader, this.owner) as Leader
    this.leaderTechnique = this.game.createCard(this.leader.leaderTechniqueID, this.owner) as LeaderTechnique
    this.passive = this.game.createCard(deck.passive, this.owner) as Passive
    this.cards = deck.cards.map(cardID => this.game.createCard(cardID, this.owner))
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

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import Card from './Card'
import DeckObject from '../structs/DeckObject'
import Leader from './Leader'
import Passive from './Passive'
import LeaderTechnique from './LeaderTechnique'
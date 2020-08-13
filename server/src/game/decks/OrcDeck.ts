import Deck from '../gameObjects/Deck'

class OrcDeck extends Deck {
  constructor (game, owner) {
    const deck = {
      leader: 'Orcissimus',
      cards: [
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'SavageWolf',
      'SavageWolf',
      'SavageWolf',
      'SavageWolf',
      'OrkusTheOrkest',
      'OrkusTheOrkest',
      'Consume',
      'Consume',
      'Consume',
      'Consume',
      'ClubOfLooting',
      'ClubOfLooting',
      'CorporalMotivation',
      'CorporalMotivation',
    ]
  }
    super(game, owner, 'OrcDeck', 'Orc Deck', deck)
  }
}

export default OrcDeck

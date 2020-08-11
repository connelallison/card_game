import Deck from '../gameObjects/Deck'

class TestDeckTwo extends Deck {
  constructor (game, owner) {
    const cards = [
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
      'OrkusTheOrkest',
      'Consume',
      'Consume',
      'Consume',
      'Consume',
      'ClubOfLooting',
      'ClubOfLooting',
      'ClubOfLooting',
    ]
    super(game, owner, 'TestDeckTwo', 'Test Deck 2', cards)
  }
}

export default TestDeckTwo

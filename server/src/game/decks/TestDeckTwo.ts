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
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'SavageWolf',
      'SavageWolf',
      'SavageWolf',
      'SavageWolf',
      'SavageWolf',
      'SavageWolf',
      'Consume',
      'Consume',
      'Consume',
      'Consume',
      'Consume'
    ]
    super(game, owner, 'TestDeckTwo', 'Test Deck 2', cards)
  }
}

export default TestDeckTwo

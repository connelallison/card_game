const Deck = require('../gameObjects/Deck')
const { create } = require('../libraries/CardLib')

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
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'JuniorOrc',
      'Consume',
      'Consume',
      'Consume',
      'Consume',
      'Consume'
    ]
    super(game, owner, 'TestDeckTwo', 'Test Deck 2', cards)
  }
}

module.exports = TestDeckTwo

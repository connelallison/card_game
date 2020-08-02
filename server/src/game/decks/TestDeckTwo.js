const Deck = require('../Deck')
const { create } = require('../CardLib')

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

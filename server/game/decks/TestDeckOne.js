const Deck = require('../Deck.js')
const { create } = require('../CardLib.js')

class TestDeckOne extends Deck {
  constructor (game, owner) {
    const cards = [
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'Footman',
      'RoyalGuard',
      'RoyalGuard',
      'RoyalGuard',
      'RoyalGuard',
      'RoyalGuard',
      'RoyalGuard',
      'Fireburst',
      'Fireburst',
      'Fireburst',
      'Fireburst',
      'Fireburst',
      'Fireburst',
    ]
    super(game, owner, 'TestDeckOne', 'Test Deck 1', cards)
  }
}

module.exports = TestDeckOne

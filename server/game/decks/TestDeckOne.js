const Deck = require('../Deck.js')
const { create } = require('../CardLib.js')

class TestDeckOne extends Deck {
  constructor (player = null) {
    const cards = [
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Footman'),
      create('Fireburst'),
      create('Fireburst'),
      create('Fireburst'),
      create('Fireburst'),
      create('Fireburst'),
      create('Fireburst')
    ]
    super('TestDeckOne', 'Test Deck 1', player, cards)
  }
}

module.exports = TestDeckOne

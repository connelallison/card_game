import Deck from '../gameObjects/Deck'

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
      'RoyalGuard',
      'RoyalGuard',
      'RoyalGuard',
      'RoyalGuard',
      'Fireburst',
      'Fireburst',
      'Fireburst',
      'HolyBook',
      'HolyBook',
      'HolyBook',
      'KnightAcademy',
      'KnightAcademy',
      'KnightAcademy',
      'KnightAcademy',
    ]
    super(game, owner, 'TestDeckOne', 'Test Deck 1', cards)
  }
}

export default TestDeckOne

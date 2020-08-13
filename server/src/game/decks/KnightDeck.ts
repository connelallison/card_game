import Deck from '../gameObjects/Deck'

class KnightDeck extends Deck {
  constructor(game, owner) {
    const deck = {
      leader: 'KingFredTheSaintly',
      cards: [
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
        'HolyBook',
        'HolyBook',
        'HolyBook',
        'KnightAcademy',
        'KnightAcademy',
        'KnightAcademy',
        'PrinceTimothy',
        'PrinceTimothy',
      ]
    }
    super(game, owner, 'KnightDeck', 'KnightDeck', deck)
  }
}

export default KnightDeck

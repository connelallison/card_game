import Deck from '../gameObjects/Deck'

class KnightDeck extends Deck {
  constructor(game, owner) {
    const deck = {
      leader: 'KingFredTheSaintly',
      passive: 'HolyProtectors',
      cards: [
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
        'KnightAcademy',
        'KnightAcademy',
        'KnightAcademy',
        'PrinceTimothy',
        'PrinceTimothy',
        'CombatTraining',
        'CombatTraining',
      ]
    }
    super(game, owner, 'KnightDeck', 'KnightDeck', deck)
  }
}

export default KnightDeck

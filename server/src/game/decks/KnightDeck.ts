import Deck from '../gameObjects/Deck'

class KnightDeck extends Deck {
  constructor(game, owner) {
    const leader: CardIDString = 'KingFredTheSaintly'
    const passive: CardIDString = 'HolyProtectors'
    const cards: CardIDString[] = [
      'Footman',
      'Footman',
      'RoyalGuard',
      'RoyalGuard',
      'Fireburst',
      'Fireburst',
      'HolyBook',
      'HolyBook',
      'KnightAcademy',
      'KnightAcademy',
      'PrinceTimothy',
      'PrinceTimothy',
      'CombatTraining',
      'CombatTraining',
      'NapalmStrike',
      'NapalmStrike',
      'BodyDouble',
      'BodyDouble',
    ]
    super(game, owner, 'KnightDeck', 'KnightDeck', { leader, passive, cards })
  }
}

export default KnightDeck

import { CardIDString } from '../stringTypes/DictionaryKeyString'
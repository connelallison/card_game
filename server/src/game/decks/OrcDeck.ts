import Deck from '../gameObjects/Deck'

class OrcDeck extends Deck {
  constructor (game, owner) {
    const leader: CardIDString = 'OrkusTheOrkest'
    const passive: CardIDString = 'SingleMindedFury'
    const cards: CardIDString[] = [
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
      'Orcissimus',
      'Orcissimus',
      'Consume',
      'Consume',
      'Consume',
      'ClubOfLooting',
      'ClubOfLooting',
      'CorporalMotivation',
      'BattleOfSuiyang',
      'BattleOfSuiyang',
    ]
    super(game, owner, 'OrcDeck', 'Orc Deck', {leader, passive, cards})
  }
}

export default OrcDeck

import { CardIDString } from '../stringTypes/DictionaryKeyString'

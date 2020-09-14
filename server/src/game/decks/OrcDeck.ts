import Deck from '../gameObjects/Deck'

class OrcDeck extends Deck {
  constructor (game, owner) {
    const leader = 'OrkusTheOrkest'
    const passive = 'SingleMindedFury'
    const cards: CardIDString[] = [
      'JuniorOrc',
      'JuniorOrc',
      'SavageWolf',
      'SavageWolf',
      'Orcissimus',
      'Orcissimus',
      'Consume',
      'Consume',
      'ClubOfLooting',
      'ClubOfLooting',
      'CorporalMotivation',
      'CorporalMotivation',
      'BattleOfSuiyang',
      'BattleOfSuiyang',
      'SuicideBomber',
      'SuicideBomber',
      'BodyDouble',
      'BodyDouble',
      'WallLabourer',
      'WallLabourer',
    ]
    super(game, owner, 'OrcDeck', 'Orc Deck', {leader, passive, cards})
  }
}

export default OrcDeck

import { CardIDString } from '../stringTypes/DictionaryKeyString'

import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import SpellZoneString from '../stringTypes/SpellZoneString'
import Actions from '../dictionaries/Actions'
import PlayRequirements from '../dictionaries/PlayRequirements'
import EventSpell from '../gameObjects/EventSpell'

class Consume extends EventSpell {
  constructor (game: Game, owner: GamePlayer, zone: SpellZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Consume', 
      'Consume', 
      3,
      'Deal 3 damage to the weakest enemy unit and draw a card.',
      [Actions.damageWeakestEnemyUnit(3), Actions.drawCards()],
      [PlayRequirements.minEnemyUnits(1)]
    )
  }
}
export default Consume
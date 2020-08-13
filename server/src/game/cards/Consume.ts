import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import Actions from '../dictionaries/Actions'
import PlayRequirements from '../dictionaries/PlayRequirements'
import EventMoment from '../gameObjects/EventMoment'

class Consume extends EventMoment {
  constructor (game: Game, owner: GamePlayer, zone: MomentZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Consume', 
      'Consume', 
      true,
      3,
      'Deal 3 damage to the weakest enemy unit and draw a card.',
      [Actions.damageWeakestEnemyUnit(3), Actions.drawCards()],
      [PlayRequirements.minEnemyUnits(1)]
    )
  }
}
export default Consume
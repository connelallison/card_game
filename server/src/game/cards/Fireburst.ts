import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import Actions from '../dictionaries/Actions'
import TargetRequirements from '../dictionaries/TargetRequirements'
import ActionMoment from '../gameObjects/ActionMoment'

class Fireburst extends ActionMoment {
  constructor (game: Game, owner: GamePlayer, zone: MomentZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Fireburst', 
      'Fireburst', 
      1, 
      'Deal 3 damage to a unit with 4 or more attack.',
      [Actions.damageChosenTarget(3)],
      [],
      true, 
      game.utils.targetDomain(['enemyUnits', 'friendlyUnits',]),
      [TargetRequirements.minAttack(4)], 
    )
  }
}
export default Fireburst

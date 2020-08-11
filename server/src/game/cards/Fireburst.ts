import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import SpellZoneString from '../stringTypes/SpellZoneString'
import Actions from '../dictionaries/Actions'
import TargetRequirements from '../dictionaries/TargetRequirements'
import ActionSpell from '../gameObjects/ActionSpell'

class Fireburst extends ActionSpell {
  constructor (game: Game, owner: GamePlayer, zone: SpellZoneString) {
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

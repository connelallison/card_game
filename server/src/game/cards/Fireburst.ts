import Spell from '../gameObjects/Spell'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import SpellZoneString from '../stringTypes/SpellZoneString'
import Actions from '../dictionaries/Actions'
import TargetRequirements from '../dictionaries/TargetRequirements'

class Fireburst extends Spell {
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

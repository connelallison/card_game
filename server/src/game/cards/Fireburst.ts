import Spell from '../gameObjects/Spell'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import SpellZoneString from '../interfaces/SpellZoneString'
import Actions from '../libraries/Actions'
import TargetRequirements from '../libraries/TargetRequirements'

class Fireburst extends Spell {
  constructor (game: Game, owner: GamePlayer, zone: SpellZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Fireburst', 
      'Fireburst', 
      1, 
      'Deal 3 damage to a minion with 4 or more attack.',
      [Actions.damageChosenTarget(3)],
      true, 
      game.utils.targetDomain(['enemyMinions', 'friendlyMinions',]),
      [TargetRequirements.minAttack(4)], 
    )
  }
}
export default Fireburst

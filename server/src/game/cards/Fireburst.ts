import Spell from '../gameObjects/Spell'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'

class Fireburst extends Spell {
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(
      game, 
      owner, 
      zone, 
      'Fireburst', 
      'Fireburst', 
      1, 
      'Deal 3 damage to a minion with 4 or more attack.',
      [game.actions.damageChosenTarget(3)],
      true, 
      game.utils.targetDomain(['enemyMinions', 'friendlyMinions',]),
      [game.constraints.minAttack(4)], 
    )
  }
}
export default Fireburst

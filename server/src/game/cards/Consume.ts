import Spell from '../gameObjects/Spell'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import SpellZoneString from '../interfaces/SpellZoneString'
import Actions from '../libraries/Actions'

class Consume extends Spell {
  constructor (game: Game, owner: GamePlayer, zone: SpellZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Consume', 
      'Consume', 
      3,
      'Deal 3 damage to the weakest enemy minion and draw a card.',
      [Actions.damageWeakestEnemyMinion(3), Actions.drawCards()],
      false,
      null,
      null
    )
  }
}
export default Consume

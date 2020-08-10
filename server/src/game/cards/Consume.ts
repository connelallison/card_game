import Spell from '../gameObjects/Spell'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import SpellZoneString from '../stringTypes/SpellZoneString'
import Actions from '../dictionaries/Actions'
import PlayRequirements from '../dictionaries/PlayRequirements'

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
      [PlayRequirements.minEnemyMinions(1)],
      false,
      null,
      null
    )
  }
}
export default Consume
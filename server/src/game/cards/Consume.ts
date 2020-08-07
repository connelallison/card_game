import Spell from '../gameObjects/Spell'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'

class Consume extends Spell {
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(
      game, 
      owner, 
      zone, 
      'Consume', 
      'Consume', 
      3,
      'Deal 3 damage to the weakest enemy minion and draw a card.',
      [game.actions.damageWeakestEnemyMinion(3), game.actions.drawCards()],
      false,
      null,
      null
    )
  }
}
export default Consume

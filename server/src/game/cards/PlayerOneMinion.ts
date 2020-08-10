import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MinionZoneString from '../stringTypes/MinionZoneString'

class PlayerOneMinion extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: MinionZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerOneMinion', 
      'Player 1 Minion', 
      2, 
      2, 
      3, 
      '', 
      [], 
      [],
      false, 
      null, 
      null
      )
  }
}

export default PlayerOneMinion

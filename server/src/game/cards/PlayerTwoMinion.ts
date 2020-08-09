import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MinionZoneString from '../interfaces/MinionZoneString'

class PlayerTwoMinion extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: MinionZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerTwoMinion', 
      'Player 2 Minion', 
      3, 
      3, 
      4, 
      '', 
      null, 
      false, 
      null, 
      null
      )
  }
}

export default PlayerTwoMinion

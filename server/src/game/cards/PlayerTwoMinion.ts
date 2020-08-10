import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MinionZoneString from '../stringTypes/MinionZoneString'

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
      [], 
      [],
      false, 
      null, 
      null
      )
  }
}

export default PlayerTwoMinion

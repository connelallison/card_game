import Unit from '../gameObjects/Unit'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import UnitZoneString from '../stringTypes/UnitZoneString'

class PlayerOneUnit extends Unit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerOneUnit', 
      'Player 1 Unit', 
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

export default PlayerOneUnit

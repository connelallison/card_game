import Unit from '../gameObjects/Unit'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import UnitZoneString from '../stringTypes/UnitZoneString'

class PlayerTwoUnit extends Unit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerTwoUnit', 
      'Player 2 Unit', 
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

export default PlayerTwoUnit

import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class PlayerTwoUnit extends GenericUnit {
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

import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class PlayerOneUnit extends GenericUnit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerOneUnit', 
      'Player 1 Unit', 
      false,
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

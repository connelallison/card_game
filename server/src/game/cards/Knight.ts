import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class Knight extends GenericUnit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Knight', 
      'Knight', 
      false,
      2, 
      2, 
      2, 
      '', 
      [], 
      [],
      false, 
      null, 
      null
      )
  }
}

export default Knight

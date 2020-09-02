import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class Knight extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Knight', 
      'Knight', 
      [],
      false,
      2, 
      2, 
      2, 
      '', 
      [], 
      [],
      [],
      [],
      false, 
      null, 
      null
      )
  }
}

export default Knight

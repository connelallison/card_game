import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class PlayerOneFollower extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerOneFollower', 
      'Player 1 Follower', 
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

export default PlayerOneFollower

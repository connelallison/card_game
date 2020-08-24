import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class PlayerTwoFollower extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'PlayerTwoFollower', 
      'Player 2 Follower', 
      false,
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

export default PlayerTwoFollower

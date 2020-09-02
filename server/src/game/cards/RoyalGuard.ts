import Follower from '../gameObjects/Follower'
import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class RoyalGuard extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'RoyalGuard', 
      'Royal Guard', 
      true,
      3, 
      3, 
      4, 
      'Guard', 
      [], 
      [],
      ['Guard'],
      false, 
      null, 
      null
      )
  }
}
export default RoyalGuard
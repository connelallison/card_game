import Follower from '../gameObjects/Follower'
import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class SavageWolf extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'SavageWolf', 
      'Savage Wolf', 
      [],
      true,
      3, 
      4, 
      3, 
      'Whenever a friendly follower dies, gain +2/+1.', 
      [], 
      [],
      [],
      ['SavageWolfTrigger'],
      false, 
      null, 
      null
      )
  }
}
export default SavageWolf
import Follower from '../gameObjects/Follower'
import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class Footman extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Footman', 
      'Footman', 
      [],
      true,
      2, 
      2, 
      4, 
      'Has +2 Attack during your turn.', 
      [], 
      [],
      [],
      ['FootmanAura'],
      false, 
      null, 
      null
    )
  }
}
export default Footman

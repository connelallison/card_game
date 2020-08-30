import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import NamelessFollower from '../gameObjects/NamelessFollower'

class JuniorOrc extends NamelessFollower {
  constructor (game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'JuniorOrc', 
      'Junior Orc', 
      true,
      2, 
      3, 
      3, 
      'Your other followers have +1 Attack.', 
      [], 
      [],
      false, 
      null, 
      null
      )
    this.addEnchantment(new Enchantments.JuniorOrcAura(this.game, this))
  }
}

export default JuniorOrc

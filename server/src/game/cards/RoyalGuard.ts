import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import MinionZoneString from '../stringTypes/MinionZoneString'

class RoyalGuard extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: MinionZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'RoyalGuard', 
      'Royal Guard', 
      3, 
      3, 
      4, 
      'Guard', 
      [], 
      [],
      false, 
      null, 
      null
      )
    this.addEnchantment(new Enchantments['Guard'](this.game, this))
  }
}
export default RoyalGuard
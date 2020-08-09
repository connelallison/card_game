import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../libraries/EnchantmentLib'
import MinionZoneString from '../interfaces/MinionZoneString'

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
      null, 
      false, 
      null, 
      null
      )
    this.addEnchantment(new Enchantments['Guard'](this.game, this))
  }
}
export default RoyalGuard
import Unit from '../gameObjects/Unit'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'

class RoyalGuard extends Unit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
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
import Unit from '../gameObjects/Unit'
import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class RoyalGuard extends GenericUnit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
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
      false, 
      null, 
      null
      )
    this.addEnchantment(new Enchantments.Guard(this.game, this))
  }
}
export default RoyalGuard
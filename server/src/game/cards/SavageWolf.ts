import Unit from '../gameObjects/Unit'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'

class SavageWolf extends Unit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'SavageWolf', 
      'Savage Wolf', 
      3, 
      4, 
      2, 
      'Whenever a friendly unit dies, gain +1/+1.', 
      [], 
      [],
      false, 
      null, 
      null
      )
    this.addEnchantment(new Enchantments['SavageWolfTrigger'](this.game, this))
  }
}
export default SavageWolf
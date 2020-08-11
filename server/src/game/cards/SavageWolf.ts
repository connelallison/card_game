import Unit from '../gameObjects/Unit'
import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class SavageWolf extends GenericUnit {
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
    this.addEnchantment(new Enchantments.SavageWolfTrigger(this.game, this))
  }
}
export default SavageWolf
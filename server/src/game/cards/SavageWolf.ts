import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import MinionZoneString from '../stringTypes/MinionZoneString'

class SavageWolf extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: MinionZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'SavageWolf', 
      'Savage Wolf', 
      3, 
      4, 
      2, 
      'Whenever a friendly minion dies, gain +1/+1.', 
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
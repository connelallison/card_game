import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import MinionZoneString from '../stringTypes/MinionZoneString'

class JuniorOrc extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: MinionZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'JuniorOrc', 
      'Junior Orc', 
      2, 
      3, 
      3, 
      'Your other minions have +1 Attack.', 
      [], 
      [],
      false, 
      null, 
      null)
    this.addEnchantment(new Enchantments['JuniorOrcAttackAura'](this.game, this))
  }
}

export default JuniorOrc

import Unit from '../gameObjects/Unit'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'

class JuniorOrc extends Unit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'JuniorOrc', 
      'Junior Orc', 
      2, 
      3, 
      3, 
      'Your other units have +1 Attack.', 
      [], 
      [],
      false, 
      null, 
      null)
    this.addEnchantment(new Enchantments['JuniorOrcAttackAura'](this.game, this))
  }
}

export default JuniorOrc

import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class JuniorOrc extends GenericUnit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
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
      'Your other units have +1 Attack.', 
      [], 
      [],
      false, 
      null, 
      null)
    this.addEnchantment(new Enchantments.JuniorOrcAttackAura(this.game, this))
  }
}

export default JuniorOrc

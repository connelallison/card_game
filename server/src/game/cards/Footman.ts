import Unit from '../gameObjects/Unit'
import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'
import GenericUnit from '../gameObjects/GenericUnit'

class Footman extends GenericUnit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Footman', 
      'Footman', 
      true,
      2, 
      2, 
      4, 
      'Has +2 Attack during your turn.', 
      [], 
      [],
      false, 
      null, 
      null
    )
    this.addEnchantment(new Enchantments.FootmanAura(this.game, this))
  }
}
export default Footman

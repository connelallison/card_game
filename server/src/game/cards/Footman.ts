import Unit from '../gameObjects/Unit'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../dictionaries/Enchantments'
import UnitZoneString from '../stringTypes/UnitZoneString'

class Footman extends Unit {
  constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Footman', 
      'Footman', 
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
    this.addEnchantment(new Enchantments['FootmanExtraDamageDuringYourTurn'](this.game, this))
  }
}
export default Footman

import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../libraries/EnchantmentLib'

class Footman extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(game, owner, zone, 'Footman', 'Footman', 2, 2, 4, 'Has +2 Attack during your turn.', null, false, null, null)
    this.addEnchantment(new Enchantments['FootmanExtraDamageDuringYourTurn'](this.game, this))
  }
}
export default Footman

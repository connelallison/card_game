import Minion from '../gameObjects/Minion'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Enchantments from '../libraries/EnchantmentLib'

class JuniorOrc extends Minion {
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(game, owner, zone, 'JuniorOrc', 'Junior Orc', 2, 3, 3, 'Your other minions have +1 Attack.', null, false, null, null)
    this.addEnchantment(new Enchantments['JuniorOrcAttackAura'](this.game, this))
  }
}

export default JuniorOrc

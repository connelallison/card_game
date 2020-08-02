import Minion from '../Minion'
import Enchantment from '../Enchantment'

class RoyalGuardTaunt extends Enchantment {
    constructor(game, owner) {
        super(
            game,
            owner,
            'RoyalGuard:Taunt', 
            'Taunt', 
            ['board'],
            ['minion'],
            enchantment => true,
            false,
            'static',
            {
              effect: (flags) => (flags.taunt = true),
              category: 'flags',
            }
        )
    }
}

class RoyalGuard extends Minion {
  constructor (game, owner, zone) {
    super(game, owner, zone, 'RoyalGuard', 'Royal Guard', 3, 3, 4, 'Taunt', null, false, null, null)
    this.enchantments.static.flags.push(new RoyalGuardTaunt(this.game, this))
  }
}
export default RoyalGuard
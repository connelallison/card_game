const Minion = require('../Minion.js')
const Enchantment = require('../Enchantment.js')

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
    super(game, owner, zone, 'RoyalGuard', 'Royal Guard', 3, 3, 4)
    this.enchantments.static.flags.push(new RoyalGuardTaunt(this.game, this))
  }
}
module.exports = RoyalGuard
const Minion = require('../Minion.js')
const Enchantment = require('../Enchantment.js')

class FootmanExtraDamageDuringYourTurn extends Enchantment {
    constructor(game, owner) {
        super(
            game,
            owner,
            'FootMan:ExtraDamageDuringYourTurn', 
            'Zeal', 
            ['board'],
            ['minion'],
            (enchantment) => (enchantment.owner.owner.myTurn()),
            false,
            'static',
            {
              effect: (stats, value) => (stats.attack += value),
              value: 2,
              category: 'stats',
            }
        )
    }
}

class Footman extends Minion {
  constructor (game, owner, zone) {
    super(game, owner, zone, 'Footman', 'Footman', 2, 2, 4)
    this.enchantments.static.stats.push(new FootmanExtraDamageDuringYourTurn(this.game, this))
  }
}
module.exports = Footman

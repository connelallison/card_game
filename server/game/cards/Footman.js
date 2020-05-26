const Minion = require('../Minion.js')
const Enchantment = require('../Enchantment.js')

class FootmanExtraDamageDuringYourTurn extends Enchantment {
    constructor(owner) {
        super(
            'FootMan:ExtraDamageDuringYourTurn', 
            'Zeal', 
            owner, 
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
  constructor () {
    super('Footman', 'Footman', 2, 2, 4)
    this.enchantments.static.stats.push(new FootmanExtraDamageDuringYourTurn(this))
  }
}
module.exports = Footman

const Minion = require('../Minion.js')
const Enchantment = require('../Enchantment.js')

class JuniorOrcDamageAura extends Enchantment {
    constructor(owner) {
        super(
            'JuniorOrc:DamageAura', 
            'Fury', 
            owner, 
            ['board'],
            ['minion'],
            (enchantment) => (true),
            true,
            'static',
            {
              effect: (stats, value) => (stats.attack += value),
              value: 1,
              category: 'stats',
              types: {
                minion: ['board'],
                // hero: ['hero']
              },
              targetRequirement: (target, source) => (source.owner.owner === target.owner && source.owner !== target)
            }
        )
    }
}
class JuniorOrc extends Minion {
  constructor () {
    super('JuniorOrc', 'Junior Orc', 2, 3, 3)
    this.enchantments.aura.stats.push(new JuniorOrcDamageAura(this))
  }
}

module.exports = JuniorOrc

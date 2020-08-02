import Minion from '../Minion'
import Enchantment from '../Enchantment'

class JuniorOrcDamageAura extends Enchantment {
    constructor(game, owner) {
        super(
            game,
            owner,
            'JuniorOrc:DamageAura', 
            'Fury', 
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
  constructor (game, owner, zone) {
    super(game, owner, zone, 'JuniorOrc', 'Junior Orc', 2, 3, 3, 'Your other minions have +1 Attack.', null, false, null, null)
    this.enchantments.aura.stats.push(new JuniorOrcDamageAura(this.game, this))
  }
}

export default JuniorOrc

import Minion from '../Minion'
import Enchantment from '../Enchantment'

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
    super(game, owner, zone, 'Footman', 'Footman', 2, 2, 4, 'Has +2 Attack during your turn.', null, false, null, null)
    this.enchantments.static.stats.push(new FootmanExtraDamageDuringYourTurn(this.game, this))
  }
}
export default Footman

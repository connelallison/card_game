import Minion from '../gameObjects/Minion'
import Enchantment from '../gameObjects/Enchantment'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Card from '../gameObjects/Card'

class FootmanExtraDamageDuringYourTurn extends Enchantment {
    constructor(game: Game, owner: Card) {
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
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(game, owner, zone, 'Footman', 'Footman', 2, 2, 4, 'Has +2 Attack during your turn.', null, false, null, null)
    this.enchantments.static.stats.push(new FootmanExtraDamageDuringYourTurn(this.game, this))
  }
}
export default Footman

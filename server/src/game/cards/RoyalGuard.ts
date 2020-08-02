import Minion from '../gameObjects/Minion'
import Enchantment from '../gameObjects/Enchantment'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Card from '../gameObjects/Card'

class RoyalGuardTaunt extends Enchantment {
    constructor(game: Game, owner: Card) {
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
  constructor (game: Game, owner: GamePlayer, zone: string) {
    super(game, owner, zone, 'RoyalGuard', 'Royal Guard', 3, 3, 4, 'Taunt', null, false, null, null)
    this.enchantments.static.flags.push(new RoyalGuardTaunt(this.game, this))
  }
}
export default RoyalGuard
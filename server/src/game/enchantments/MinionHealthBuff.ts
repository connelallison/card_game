import Game from "../Game"
import Minion from "../gameObjects/Minion"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class MinionHealthBuff extends StaticEnchantment {
    constructor(game: Game, owner: Minion, values: any = { health: 0 }) {
        super(
            game,
            owner,
            'HealthBuff', 
            'Health Buff', 
            ['board', 'hand', 'deck'],
            ['minion'],
            [],
            ['stats'],
            [{
              effect: game.effects.incrementHealth,
              value: values.health,
              category: 'stats',
            }]
        )
    }
}

export default MinionHealthBuff
import Game from "../Game"
import Minion from "../gameObjects/Minion"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class MinionAttackAndHealthBuff extends StaticEnchantment {
    constructor(game: Game, owner: Minion, values: { attack: number, health: number }) {
        super(
            game,
            owner,
            'MinionAttackandHealthBuff',
            'Minion Attack and Health Buff',
            ['board', 'hand', 'deck'],
            ['minion'],
            [],
            ['stats'],
            [
                {
                    effect: game.effects.incrementAttack,
                    value: values.attack,
                    category: 'stats',
                },
                {
                    effect: game.effects.incrementHealth,
                    value: values.health,
                    category: 'stats',
                }
            ]
        )
    }
}

export default MinionAttackAndHealthBuff
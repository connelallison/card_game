import Game from "../Game"
import Minion from "../gameObjects/Minion"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class MinionAttackBuff extends StaticEnchantment {
    constructor(game: Game, owner: Minion, values: any = { attack: 0 }) {
        super(
            game,
            owner,
            'AttackBuff', 
            'Attack Buff', 
            ['board', 'hand', 'deck'],
            ['minion'],
            [],
            ['stats'],
            [{
              effect: game.effects.incrementAttack,
              value: values.attack,
              category: 'stats',
            }]
        )
    }
}

export default MinionAttackBuff
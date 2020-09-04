import StaticEnchantment from "../gameObjects/StaticEnchantment"

class AttackBuff extends StaticEnchantment {
    constructor(game: Game, owner: GameObject, values: any = { attack: 0 }) {
        super(
            game,
            owner,
            'AttackBuff',
            'Attack Buff',
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Follower', 'Leader'],
            [],
            [{
                operation: 'incrementAttack',
                value: values.attack,
            }]
        )
    }
}

export default AttackBuff

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
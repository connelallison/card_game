import StaticEnchantment from "../gameObjects/StaticEnchantment"

class AttackAndHealthBuff extends StaticEnchantment {
    constructor(game: Game, owner: GameObject, values: { attack: number, health: number }) {
        super(
            game,
            owner,
            'AttackandHealthBuff',
            'Attack and Health Buff',
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Follower', 'Leader'],
            [],
            [
                {
                    operation: 'incrementAttack',
                    value: values.attack,
                },
                {
                    operation: 'incrementHealth',
                    value: values.health,
                }
            ]
        )
    }
}

export default AttackAndHealthBuff

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
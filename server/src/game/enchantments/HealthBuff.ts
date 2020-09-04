import StaticEnchantment from "../gameObjects/StaticEnchantment"

class HealthBuff extends StaticEnchantment {
    constructor(game: Game, owner: GameObject, values: {health: number} = { health: 0 }) {
        super(
            game,
            owner,
            'HealthBuff', 
            'Health Buff', 
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Follower', 'Leader'],
            [],
            [{
                operation: 'incrementHealth',
                value: values.health,
            }]
        )
    }
}

export default HealthBuff

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
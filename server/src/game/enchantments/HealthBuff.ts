import StaticEnchantment from "../gameObjects/StaticEnchantment"

class HealthBuff extends StaticEnchantment {
    constructor(game: Game, owner: GameObject, values: { health: number } = { health: 0 }) {
        super(
            game,
            owner,
            {
                'id': 'HealthBuff',
                'name': 'Health Buff',
                'type': 'Enchantment',
                'subtype': 'Static',
                'activeZones': ['board', 'hand', 'deck', 'leaderZone'],
                'activeTypes': ['Follower', 'Leader'],
                'effectObjs': [
                    {
                        'operation': 'incrementHealth',
                        'value': values.health
                    }
                ]
            }
        )
    }
}

export default HealthBuff

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
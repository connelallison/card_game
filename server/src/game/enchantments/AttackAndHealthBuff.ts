import StaticEnchantment from "../gameObjects/StaticEnchantment"

class AttackAndHealthBuff extends StaticEnchantment {
    constructor(game: Game, owner: GameObject, values: { attack: number, health: number } = { attack: 0, health: 0 }) {
        super(
            game,
            owner,
            {
                'id': 'AttackAndHealthBuff',
                'name': 'Attack and Health Buff',
                'type': 'Enchantment',
                'subtype': 'Static',
                'activeZones': ['board', 'hand', 'deck', 'leaderZone'],
                'activeTypes': ['Follower', 'Leader'],
                'effectObjs': [
                    {
                        'operation': 'incrementAttack',
                        'value': values.attack
                    }, 
                    {
                        'operation': 'incrementHealth',
                        'value': values.health
                    }
                ]
            }
        )
    }
}

export default AttackAndHealthBuff

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class AttackBuff extends StaticEnchantment {
    constructor(game: Game, owner: GameObject, values: { attack: number } = { attack: 0 }) {
        super(
            game,
            owner,
            {
                'id': 'AttackBuff',
                'name': 'Attack Buff',
                'type': 'Enchantment',
                'subtype': 'Static',
                'activeZones': ['board', 'hand', 'deck', 'leaderZone'],
                'activeTypes': ['Follower', 'Leader'],
                'effectObjs': [
                    {
                        'operation': 'incrementAttack',
                        'value': values.attack
                    }
                ]
            }
        )
    }
}

export default AttackBuff

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
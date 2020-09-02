import Game from "../gamePhases/Game"
import StaticEnchantment from "../gameObjects/StaticEnchantment"
import GameObject from "../gameObjects/GameObject"

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
import Game from "../gameSystems/Game"
import Character from "../gameObjects/Character"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class AttackBuff extends StaticEnchantment {
    owner: Character

    constructor(game: Game, owner: Character, values: any = { attack: 0 }) {
        super(
            game,
            owner,
            'AttackBuff',
            'Attack Buff',
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Unit', 'Leader'],
            [],
            [{
                operation: 'incrementAttack',
                value: values.attack,
            }]
        )
    }
}

export default AttackBuff
import Game from "../gameSystems/Game"
import StaticEnchantment from "../gameObjects/StaticEnchantment"
import Character from "../gameObjects/Character"

class AttackAndHealthBuff extends StaticEnchantment {
    owner: Character

    constructor(game: Game, owner: Character, values: { attack: number, health: number }) {
        super(
            game,
            owner,
            'AttackandHealthBuff',
            'Attack and Health Buff',
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Unit', 'Leader'],
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
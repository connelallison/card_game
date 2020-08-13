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
            ['stats'],
            [
                {
                    effect: game.effects.incrementAttack,
                    value: values.attack,
                    category: 'stats',
                },
                {
                    effect: game.effects.incrementHealth,
                    value: values.health,
                    category: 'stats',
                }
            ]
        )
    }
}

export default AttackAndHealthBuff
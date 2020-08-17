import Game from "../gameSystems/Game"
import Character from "../gameObjects/Character"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class HealthBuff extends StaticEnchantment {
    owner: Character
    
    constructor(game: Game, owner: Character, values: {health: number} = { health: 0 }) {
        super(
            game,
            owner,
            'HealthBuff', 
            'Health Buff', 
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Unit', 'Leader'],
            [],
            [{
                operation: 'incrementHealth',
                value: values.health,
            }]
        )
    }
}

export default HealthBuff
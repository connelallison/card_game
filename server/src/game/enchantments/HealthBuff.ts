import Game from "../gamePhases/Game"
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
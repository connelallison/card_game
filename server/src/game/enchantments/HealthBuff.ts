import Game from "../gameSystems/Game"
import Character from "../gameObjects/Character"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class HealthBuff extends StaticEnchantment {
    owner: Character
    
    constructor(game: Game, owner: Character, values: any = { health: 0 }) {
        super(
            game,
            owner,
            'HealthBuff', 
            'Health Buff', 
            ['board', 'hand', 'deck', 'leaderZone'],
            ['Unit', 'Leader'],
            [],
            ['stats'],
            [{
              effect: game.effects.incrementHealth,
              value: values.health,
              category: 'stats',
            }]
        )
    }
}

export default HealthBuff
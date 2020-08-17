import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../gameSystems/Game";
import Character from "../gameObjects/Character";
import Unit from "../gameObjects/Unit";

class Guard extends StaticEnchantment {
    owner: Unit
    
    constructor(game: Game, owner: Character) {
        super(
            game,
            owner,
            'Guard', 
            'Guard', 
            ['board'],
            ['Unit'],
            [],
            [{
              operation: 'guard',
              value: true
            }]
        )
    }
}

export default Guard
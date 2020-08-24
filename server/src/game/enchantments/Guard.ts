import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../gameSystems/Game";
import Character from "../gameObjects/Character";
import Follower from "../gameObjects/Follower";

class Guard extends StaticEnchantment {
    owner: Follower
    
    constructor(game: Game, owner: Character) {
        super(
            game,
            owner,
            'Guard', 
            'Guard', 
            ['board'],
            ['Follower'],
            [],
            [{
              operation: 'guard',
              value: true
            }]
        )
    }
}

export default Guard
import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

class Guard extends StaticEnchantment {
    constructor(game: Game, owner: GameObject) {
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
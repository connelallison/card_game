import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../Game";
import Character from "../gameObjects/Character";
import Minion from "../gameObjects/Minion";

class Guard extends StaticEnchantment {
    owner: Minion
    
    constructor(game: Game, owner: Character) {
        super(
            game,
            owner,
            'Guard', 
            'Guard', 
            ['board'],
            ['minion'],
            [],
            ['flags'],
            [{
              effect: game.effects.guard,
              category: 'flags',
            }]
        )
    }
}

export default Guard
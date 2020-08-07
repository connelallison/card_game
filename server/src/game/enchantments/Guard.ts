import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../Game";
import Character from "../gameObjects/Character";

class Guard extends StaticEnchantment {
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
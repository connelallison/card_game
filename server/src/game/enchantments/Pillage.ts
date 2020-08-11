import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../gameSystems/Game";
import Unit from "../gameObjects/Unit";
import DestroyableCard from "../gameObjects/DestroyableCard";

class Pillage extends StaticEnchantment {
    owner: Unit
    
    constructor(game: Game, owner: DestroyableCard) {
        super(
            game,
            owner,
            'Pillage', 
            'Pillage', 
            ['board', 'leader', 'creations'],
            ['unit', 'leader', 'creation'],
            [],
            ['flags'],
            [{
              effect: game.effects.pillage,
              category: 'flags',
            }]
        )
    }
}

export default Pillage
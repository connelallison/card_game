import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../gameSystems/Game";
import DestroyableCard from "../gameObjects/DestroyableCard";

class Pillage extends StaticEnchantment {
    owner: DestroyableCard
    
    constructor(game: Game, owner: DestroyableCard) {
        super(
            game,
            owner,
            'Pillage', 
            'Pillage', 
            ['board', 'leaderZone', 'creationZone'],
            ['Unit', 'Leader', 'Creation'],
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
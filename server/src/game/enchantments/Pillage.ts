import StaticEnchantment from "../gameObjects/StaticEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

class Pillage extends StaticEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'Pillage', 
            'Pillage', 
            ['board', 'leaderZone', 'creationZone'],
            ['Follower', 'Leader', 'Creation'],
            [],
            [{
                operation: 'pillage',
                value: true
            }]
        )
    }
}

export default Pillage
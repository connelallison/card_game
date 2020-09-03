import AuraEnchantment from "../gameObjects/AuraEnchantment";

class JuniorOrcAura extends AuraEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'JuniorOrcAura',
            'Junior Orc Aura',
            ['board'],
            ['Follower'],
            [],
            [{
                operation: 'incrementAttack',
                value: 1,
            }],
            'friendlyBoard',
            [{ targetRequirement: 'isFriendly' }, { targetRequirement: 'notSelf' }],
            1,
        )
    }
}

export default JuniorOrcAura

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
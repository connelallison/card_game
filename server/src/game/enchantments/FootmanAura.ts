import AuraEnchantment from "../gameObjects/AuraEnchantment"

class FootmanAura extends AuraEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'FootmanAura',
            'Footman Aura',
            ['board'],
            ['Follower'],
            [{ playRequirement: 'isMyTurn' }],
            [{
                operation: 'incrementAttack',
                value: 2,
            }],
            'friendlyBoard',
            [{targetRequirement: 'isSelf'}],
            1,
        )
    }
}

export default FootmanAura

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
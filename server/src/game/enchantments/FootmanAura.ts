import Game from "../gamePhases/Game"
import AuraEnchantment from "../gameObjects/AuraEnchantment"
import GameObject from "../gameObjects/GameObject"

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
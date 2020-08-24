import Game from "../gameSystems/Game"
import Card from "../gameObjects/Card"
import Follower from "../gameObjects/Follower"
import AuraEnchantment from "../gameObjects/AuraEnchantment"

class FootmanAura extends AuraEnchantment {
    owner: Follower

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'FootmanAura',
            'Footman Aura',
            ['board'],
            ['Follower'],
            [(enchantment) => (enchantment.controller().myTurn())],
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
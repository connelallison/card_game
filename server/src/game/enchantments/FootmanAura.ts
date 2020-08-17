import Game from "../gameSystems/Game"
import Card from "../gameObjects/Card"
import Unit from "../gameObjects/Unit"
import AuraEnchantment from "../gameObjects/AuraEnchantment"

class FootmanAura extends AuraEnchantment {
    owner: Unit

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'FootmanAura',
            'Footman Aura',
            ['board'],
            ['Unit'],
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
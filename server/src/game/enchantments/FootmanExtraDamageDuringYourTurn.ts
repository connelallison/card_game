import Game from "../gameSystems/Game"
import Card from "../gameObjects/Card"
import StaticEnchantment from "../gameObjects/StaticEnchantment"
import Unit from "../gameObjects/Unit"

class FootmanExtraDamageDuringYourTurn extends StaticEnchantment {
    owner: Unit
    
    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'FootMan:ExtraDamageDuringYourTurn', 
            'Zeal', 
            ['board'],
            ['unit'],
            [(enchantment) => (enchantment.controller().myTurn())],
            ['stats'],
            [{
              effect: game.effects.incrementAttack,
              value: 2,
              category: 'stats',
            }]
        )
    }
}

export default FootmanExtraDamageDuringYourTurn
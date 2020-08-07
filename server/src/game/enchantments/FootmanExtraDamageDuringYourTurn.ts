import Game from "../Game"
import Card from "../gameObjects/Card"
import StaticEnchantment from "../gameObjects/StaticEnchantment"

class FootmanExtraDamageDuringYourTurn extends StaticEnchantment {
    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'FootMan:ExtraDamageDuringYourTurn', 
            'Zeal', 
            ['board'],
            ['minion'],
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
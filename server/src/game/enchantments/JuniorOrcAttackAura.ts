import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";

class JuniorOrcAttackAura extends AuraEnchantment {
    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'JuniorOrc:AttackAura', 
            'Fury', 
            ['board'],
            ['minion'],
            [],
            ['stats'],
            [{
              effect: game.effects.incrementAttack,
              value: 1,
              category: 'stats',
            }],
            { minion: ['board'] },
            [(target, source) => (source.controller() === target.controller()), (target, source) => (source.owner !== target)]
        )
    }
}

export default JuniorOrcAttackAura
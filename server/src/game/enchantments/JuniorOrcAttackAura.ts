import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";
import Unit from "../gameObjects/Unit";
import TargetRequirements from "../dictionaries/TargetRequirements";

class JuniorOrcAttackAura extends AuraEnchantment {
    owner: Unit
    
    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'JuniorOrc:AttackAura', 
            'Fury', 
            ['board'],
            ['unit'],
            [],
            ['stats'],
            [{
              effect: game.effects.incrementAttack,
              value: 1,
              category: 'stats',
            }],
            { unit: ['board'] },
            [TargetRequirements.friendlyTarget(), TargetRequirements.notSelf()]
        )
    }
}

export default JuniorOrcAttackAura
import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";
import Minion from "../gameObjects/Minion";
import TargetRequirements from "../dictionaries/TargetRequirements";

class JuniorOrcAttackAura extends AuraEnchantment {
    owner: Minion
    
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
            [TargetRequirements.friendlyTarget(), TargetRequirements.notSelf()]
        )
    }
}

export default JuniorOrcAttackAura
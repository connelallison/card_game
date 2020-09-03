import AuraEnchantment from "../gameObjects/AuraEnchantment";

class CombatTrainingAura extends AuraEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'CombatTrainingAura',
            'Combat Training Aura',
            ['passiveZone'],
            ['Passive'],
            [],
            [{
                operation: 'incrementAttack',
                value: 1,
            }],
            'friendlyBoard',
            [{ 
                targetRequirement: 'isSpecificCardClass',
                values: {
                    cardID: 'Knight',
                }
            }],
            1,
        )
    }
}

export default CombatTrainingAura

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import Passive from "../gameObjects/Passive";

class CombatTrainingAura extends AuraEnchantment {
    owner: Passive

    constructor(game: Game, owner: Card) {
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
            }, {
                operation: 'incrementHealth',
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
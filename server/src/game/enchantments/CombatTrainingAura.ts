import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEnchantmentData = {
    id: 'CombatTrainingAura',
    name: {
        english: `Combat Training Aura`,
    },
    type: 'Enchantment',
    subtype: 'Aura',
    priority: 1,
    activeZones: ['passiveZone'],
    activeTypes: ['Passive'],
    effectObjs: [{
        operation: 'incrementAttack',
        value: 1,
    }],
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard'],
        requirements: [{
            targetRequirement: 'isSpecificCardClass',
            values: {
                'cardID': 'Knight',
            }
        }]
    },
}

class CombatTrainingAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default CombatTrainingAura
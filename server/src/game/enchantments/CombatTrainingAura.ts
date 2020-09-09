import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";

const data: AuraEnchantmentData = {
    'id': 'CombatTrainingAura',
    'name': 'Combat Training Aura',
    'type': 'Enchantment',
    'subtype': 'Aura',
    'activeZones': ['passiveZone'],
    'activeTypes': ['Passive'],
    'effectObjs': [{
        operation: 'incrementAttack',
        value: 1,
    }],
    'targetDomain': ['friendlyBoard'],
    'targetRequirements': [{
        'targetRequirement': 'isSpecificCardClass',
        'values': {
            'cardID': 'Knight',
        }
    }],
    'priority': 1,
}

class CombatTrainingAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data

    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}

export default CombatTrainingAura

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
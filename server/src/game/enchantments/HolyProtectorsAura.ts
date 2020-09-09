import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";

const data: AuraEnchantmentData = {
    'id': 'HolyProtectorsAura',
    'name': 'Holy Protectors Aura',
    'type': 'Enchantment',
    'subtype': 'Aura',
    'activeZones': ['passiveZone'],
    'activeTypes': ['Passive'],
    'targetDomain': ['friendlyLeader'],
    'targetRequirements': [{
        'targetRequirement': 'isFriendly'
    }],
    'priority': 3,
    'effectObjs': [{
        'operation': 'incrementHealth',
        'value': {
            'valueType': 'number',
            'from': 'numbers',
            'reducer': 'sum',
            'numbers': {
                'valueType': 'numbers',
                'from': 'targets',
                'numberMap': 'health',
                'targets': {
                    'valueType': 'targets',
                    'from': 'targetDomain',
                    'targetDomain': ['friendlyBoard']
                }
            }
        }
    }]
}

class HolyProtectorsAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data

    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}

export default HolyProtectorsAura

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
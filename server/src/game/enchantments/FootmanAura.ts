import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment"

const data: AuraEnchantmentData = {
    'id': 'FootmanAura',
    'name': 'Footman Aura',
    'type': 'Enchantment',
    'subtype': 'Aura',
    'activeZones': ['board'],
    'activeTypes': ['Follower'],
    'activeRequirements': [{
        'activeRequirement': 'isMyTurn'
    }],
    'targetDomain': ['self'],
    'effectObjs': [
        {
            'operation': 'incrementAttack',
            'value': 2
        }
    ],
    'priority': 1,
}

class FootmanAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data

    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}

export default FootmanAura

import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
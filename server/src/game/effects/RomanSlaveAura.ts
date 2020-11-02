import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'RomanSlaveAura',
    name: {
        english: `Roman Slave Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Roman Slaves can't attack.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Roman Slave Aura` },
        text: {
            templates: {
                english: `Can't attack.`,
            },
        },
        stackable: false,
        functions: [{
            operation: 'cantAttack',
            value: true
        }],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'self',
        requirements: [{
            targetRequirement: 'isSpecificCardClass',
            values: {
                cardID: 'RomanSlave'
            }
        }]
    }
}

class RomanSlaveAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default RomanSlaveAura
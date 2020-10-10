import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
import { sumFriendlyFollowersHealth } from "../dictionaries/DynamicValueShortcuts";

const data: AuraEffectData = {
    id: 'SlaveAura',
    name: {
        english: `Slave Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Slaves can't attack.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Slave Aura` },
        text: {
            templates: {
                english: `Can't attack.`,
            },
        },
        functions: [{
            operation: 'cantAttack',
            value: true
        }],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard'],
        requirements: [{
            targetRequirement: 'isSpecificCardClass',
            values: {
                cardID: 'Slave'
            }
        }]
    }
}

class SlaveAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SlaveAura
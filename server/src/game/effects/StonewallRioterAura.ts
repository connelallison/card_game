import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'StonewallRioterAura',
    name: {
        english: `Stonewall Rioter Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `All your copies of this follower have +2 Health.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    activeTypes: ['Follower'],
    effectFunction: {
        name: { english: `Stonewall Rioter Aura` },
        text: {
            templates: {
                english: `+2 Health.`,
            },
        },
        stackable: true,
        functions: [
            {
              operation: 'incrementHealth',
              value: 2,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'friendlyBoard',
        requirements: [
            {
                targetRequirement: 'isSpecificCardClass',
                values: {
                    cardID: {
                        valueType: 'string',
                        from: 'target',
                        stringMap: 'classID',
                        target: {
                            valueType: 'target',
                            from: 'targetDomain',
                            targetDomain: 'self',
                        }
                    }
                }
            },
        ]
    },
}

class StonewallRioterAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default StonewallRioterAura
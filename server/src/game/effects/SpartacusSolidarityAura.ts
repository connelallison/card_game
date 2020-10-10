import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'SpartacusSolidarityAura',
    name: {
        english: `Spartacus Solidarity Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your nameless followers are Spartacus.`,
        },
    },
    priority: 0,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Spartacus Aura` },
        text: {
            templates: {
                english: `"I'm Spartacus!"`,
            },
        },
        functions: [
            {
                operation: 'setID',
                value: 'SpartacusImpersonator'
            },
            {
                operation: 'setName',
                value: { english: `Spartacus` }
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard'],
        requirements: [{
            targetRequirement: 'isSubtype',
            values: {
                subtype: 'Nameless'
            }
        }]
    }
}

class SpartacusSolidarityAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SpartacusSolidarityAura
import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'ImSpartacusAura',
    name: {
        english: `"I'm Spartacus!" Aura`,
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
        name: { english: `"I'm Spartacus!" Aura` },
        text: {
            templates: {
                english: `"I'm Spartacus!"`,
            },
        },
        stackable: false,
        functions: [
            {
                operation: 'setID',
                value: 'SpartacusFollower'
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

class ImSpartacusAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ImSpartacusAura
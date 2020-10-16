import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'HenryFordAura',
    name: {
        english: `Henry Ford Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your techniques cost (1) less`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Henry Ford Aura` },
        text: {
            templates: {
                english: `Cost reduced by (1).`,
            },
        },
        stackable: true,
        functions: [
            {
                operation: 'decreaseCost',
                value: 1,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyCreations', 'friendlyHand'],
        requirements: [
            {
                targetRequirement: 'isSubtype',
                values: {
                    subtype: 'Technique',
                }
            },
        ],
    },
}

class HenryFordAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HenryFordAura
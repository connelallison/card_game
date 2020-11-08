import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'StatueOfLibertyAura',
    name: {
        english: `Statue of Liberty Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your followers have +0.5/+0.5.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Statue of Liberty Aura` },
        text: {
            templates: {
                english: `+0.5/+0.5`,
            },
        },
        stackable: true,
        functions: [
            {
                operation: 'incrementAttack',
                value: 0.5,
            },
            {
                operation: 'incrementHealth',
                value: 0.5,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'friendlyBoard'
    },
}

class StatueOfLibertyAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default StatueOfLibertyAura
import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'RansomEOldsAura',
    name: {
        english: `Ransom E. Olds Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your (leader) techniques are Repeatable.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Ransom E. Olds Aura` },
        text: {
            templates: {
                english: `Repeatable.`,
            },
        },
        stackable: false,
        functions: [
            {
              operation: 'repeatable',
              value: true,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyHand', 'friendlyCreations', 'friendlyLeaderTechnique'],
        requirements: [
            {
                targetRequirement: 'isSubtypes',
                values: {
                    subtypes: ['Active', 'Technique'],
                }
            },
        ]
    },
    expires: ['ExpiresEndOfMyTurn'],
}

class RansomEOldsAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default RansomEOldsAura
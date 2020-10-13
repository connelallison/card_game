import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'LibraryOfAlexandriaAura',
    name: {
        english: `Library of Alexandria Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your Works and Techniques are Immune.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Library of Alexandria Aura` },
        text: {
            templates: {
                english: `Immune.`,
            },
        },
        functions: [
            {
              operation: 'immune',
              value: true,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'friendlyCreations',
        requirements: [
            {
              targetRequirement: 'isNotSubtype',
              values: {
                  subtype: 'Weapon',
              }
            },
            {
              targetRequirement: 'isNotSubtype',
              values: {
                  subtype: 'Wonder',
              }
            },
        ]
    },
}

class LibraryOfAlexandriaAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default LibraryOfAlexandriaAura
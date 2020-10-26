import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'EconomiesOfScaleAura',
    name: {
        english: `Economies of Scale Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Cards in your hand cost (0.1) less.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Economies of Scale Aura` },
        text: {
            templates: {
                english: `Cost reduced by (0.1).`,
            },
        },
        stackable: true,
        functions: [
            {
              operation: 'decreaseCost',
              value: 0.1,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'friendlyHand',
    },
}

class EconomiesOfScaleAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default EconomiesOfScaleAura
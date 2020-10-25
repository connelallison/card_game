import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'GeorgeMarshallAura',
    name: {
        english: `George Marshall Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Both players have Growth 1.`,
        },
    },
    priority: 0,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `George Marshall Aura` },
        text: {
            templates: {
                english: `Growth 1`,
            },
        },
        stackable: true,
        functions: [
            {
                operation: 'incrementGrowth',
                value: 1,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyPlayer', 'enemyPlayer'],
    },
}

class GeorgeMarshallAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default GeorgeMarshallAura
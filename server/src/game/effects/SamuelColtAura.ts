import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'SamuelColtAura',
    name: {
        english: `Samuel Colt Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `All followers have Lethal.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Samuel Colt Aura` },
        text: {
            templates: {
                english: `Lethal.`,
            },
        },
        stackable: false,
        functions: [
            {
                operation: 'lethal',
                value: true,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard', 'enemyBoard'],
    },
}

class SamuelColtAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SamuelColtAura
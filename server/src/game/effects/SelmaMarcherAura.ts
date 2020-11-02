import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'SelmaMarcherAura',
    name: {
        english: `Selma Marcher Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Selma Marcher can't attack.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Selma Marcher Aura` },
        text: {
            templates: {
                english: `Can't attack.`,
            },
        },
        stackable: false,
        functions: [
            {
                operation: 'cantAttack',
                value: true,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'self',
        requirements: [{
            targetRequirement: 'isSpecificCardClass',
            values: {
                cardID: 'SelmaMarcher'
            }
        }]
    },
}

class SelmaMarcherAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SelmaMarcherAura
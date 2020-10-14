import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'SpartacusGladiatorAura',
    name: {
        english: `Spartacus, Gladiator Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your followers can attack.`,
        },
    },
    priority: 2,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Spartacus, Gladiator Aura` },
        text: {
            templates: {
                english: `Can attack.`,
            },
        },
        stackable: false,
        functions: [
            {
              operation: 'cantAttack',
              value: false,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'friendlyBoard'
    },
}

class SpartacusGladiatorAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SpartacusGladiatorAura
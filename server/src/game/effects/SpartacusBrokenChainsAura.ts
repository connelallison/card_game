import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'SpartacusBrokenChainsAura',
    name: {
        english: `Broken Chains Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Passive: Your followers can attack (even if they can't).`,
        },
    },
    priority: 2,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Broken Chains Aura` },
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
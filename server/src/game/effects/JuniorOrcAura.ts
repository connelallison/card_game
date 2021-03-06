import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'JuniorOrcAura',
    name: {
        english: `Junior Orc Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Your other followers have +1 Attack.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: {
            english: `Junior Orc Aura`,
        },
        text: { templates: { english: `+1 Attack.` } },
        stackable: true,
        functions: [{
            operation: 'incrementAttack',
            value: 1
        }]
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard'],
        requirements: [
            { targetRequirement: 'isFriendly' },
            { targetRequirement: 'isNotSelf' }
        ],
    },
}

class JuniorOrcAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default JuniorOrcAura
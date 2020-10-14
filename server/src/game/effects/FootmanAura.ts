import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: AuraEffectData = {
    id: 'FootmanAura',
    name: {
        english: `Footman Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: { templates: { english: `+2 Attack` } },
    priority: 1,
    activeZones: 'inPlay',
    activeTypes: 'Character',
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['self'],
    },
    activeRequirements: [{
        activeRequirement: 'isMyTurn'
    }],
    effectFunction: {
        name: { english: `Footman Aura` },
        text: { templates: { english: `+2 Attack` } },
        stackable: true,
        functions: [{
            operation: 'incrementAttack',
            value: 2
        }],
    }
}

class FootmanAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default FootmanAura
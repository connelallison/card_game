import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'JohnTheBaptistAura',
    name: {
        english: `John the Baptist Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: { templates: { english: `Legacy: The slot where this died has +2/+2.` } },
    priority: 1,
    activeZones: ['legacy'],
    activeTypes: ['Follower'],
    effectFunction: {
        name: {
            english: `John the Baptist Aura`,
        },
        text: { templates: { english: `+2/+2` } },
        functions: [
            {
                operation: 'incrementAttack',
                value: 2
            },
            {
                operation: 'incrementHealth',
                value: 2
            },
        ]
    },
    targets: {
        valueType: 'targets',
        from: 'memory',
        param: 'deathSlot',
        targetMemory: {
            valueType: 'target',
            from: 'targetDomain',
            targetDomain: 'self',
        }
    }
}

class JohnTheBaptistAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default JohnTheBaptistAura
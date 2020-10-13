import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'TankManAura',
    name: {
        english: `Tank Man Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `The follower opposite can't attack.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    activeTypes: ['Follower'],
    effectFunction: {
        name: { english: `Tank Man Aura` },
        text: {
            templates: {
                english: `Can't attack.`,
            },
        },
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
        targetDomain: 'oppositeFollower'
    },
}

class TankManAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default TankManAura
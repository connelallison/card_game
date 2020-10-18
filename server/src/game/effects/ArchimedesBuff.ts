import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'ArchimedesBuff',
    name: {
        english: `Archimedes Buff`,
    },
    stackable: true,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `+1/+1 and Rush.` } },
    activeTypes: ['Follower'],
    effectObjs: [
        {
            operation: 'rush',
            value: true,
        },
        {
            operation: 'incrementAttack',
            value: 1,
        },
        {
          operation: 'incrementHealth',
          value: 1,
        },
    ],
}

class ArchimedesBuff extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ArchimedesBuff
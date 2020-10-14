import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Rush',
    name: {
        english: `Rush`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Rush` } },
    stackable: false,
    activeTypes: ['Follower'],
    effectObjs: [{
        operation: 'rush',
        value: true
    }]
}

class Rush extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Rush
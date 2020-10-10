import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Mob',
    name: {
        english: `Mob`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Mob` } },
    activeTypes: ['Follower'],
    effectObjs: [{
        operation: 'mob',
        value: true
    }]
}

class Mob extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Mob
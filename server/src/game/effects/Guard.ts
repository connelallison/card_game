import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Guard',
    name: {
        english: `Guard`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Guard` } },
    stackable: false,
    activeTypes: ['Follower'],
    effectObjs: [{
        operation: 'guard',
        value: true
    }],

}

class Guard extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Guard
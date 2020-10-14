import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Fortune',
    name: {
        english: `Fortune`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Fortune` } },
    stackable: false,
    activeTypes: 'Character',
    effectObjs: [
        {
            operation: 'fortune',
            value: true,
        },
    ],
}

class Fortune extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Fortune
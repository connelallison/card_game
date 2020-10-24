import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Rot',
    name: {
        english: `Rot`,
    },
    stackable: false,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Rot` } },
    activeTypes: 'Card',
    effectObjs: [
        {
            operation: 'rot',
            value: true,
        },
    ],
}

class Rot extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Rot
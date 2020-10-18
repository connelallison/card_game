import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Repeatable',
    name: {
        english: `Repeatable`,
    },
    stackable: false,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Repeatable` } },
    activeSubtypes: ['Active', 'Technique'],
    effectObjs: [
        {
            operation: 'repeatable',
            value: true,
        },
    ],
}

class Repeatable extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Repeatable
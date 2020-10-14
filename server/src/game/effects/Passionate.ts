import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Passionate',
    name: {
        english: `Passionate`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Passionate` } },
    stackable: false,
    activeSubtypes: ['Leader', 'Nameless', 'Famous', 'Weapon'],
    effectObjs: [
        {
            operation: 'passionate',
            value: true,
        },
    ],
}

class Passionate extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Passionate
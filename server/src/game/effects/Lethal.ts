import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Lethal',
    name: {
        english: `Lethal`,
    },
    stackable: false,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Lethal` } },
    activeTypes: 'Card',
    effectObjs: [
        {
            operation: 'lethal',
            value: true,
        },
    ],
}

class Lethal extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Lethal
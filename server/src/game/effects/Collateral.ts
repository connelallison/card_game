import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Collateral',
    name: {
        english: `Collateral`,
    },
    stackable: false,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Collateral` } },
    activeTypes: 'Card',
    effectObjs: [
        {
            operation: 'collateral',
            value: true,
        },
    ],
}

class Collateral extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Collateral
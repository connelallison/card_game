import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'SupercontangoEffect',
    name: {
        english: `Supercontango Effect`,
    },
    stackable: false,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Your card costs can be reduced to (-1).` } },
    effectObjs: [
        {
          operation: 'setMinCardCost',
          value: -1,
        },
    ],
    expires: ['ExpiresEndOfMyTurn'],
}

class SupercontangoEffect extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SupercontangoEffect
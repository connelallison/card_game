import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Bloodthirst',
    name: {
        english: `Bloodthirst`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Bloodthirst` } },
    stackable: false,
    activeSubtypes: 'hasAttack',
    effectObjs: [
        {
          operation: 'bloodthirst',
          value: true,
        },
    ],
}

class Bloodthirst extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Bloodthirst
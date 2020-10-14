import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Snipe',
    name: {
        english: `Snipe`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Snipe` } },
    stackable: false,
    activeSubtypes: 'hasAttack',
    effectObjs: [{
        operation: 'snipe',
        value: true,
    }],
}

class Snipe extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Snipe
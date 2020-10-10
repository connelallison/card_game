import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'Pillage',
    name: {
        english: `Pillage`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Pillage` } },
    activeTypes: ['Follower', 'Creation', 'Leader', 'LeaderTechnique', 'Moment'],
    effectObjs: [{
        operation: 'pillage',
        value: true
    }]
}

class Pillage extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Pillage
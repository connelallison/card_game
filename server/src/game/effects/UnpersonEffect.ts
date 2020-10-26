import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEffectData = {
    id: 'UnpersonEffect',
    name: {
        english: `Vaporised`,
    },
    stackable: false,
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `This follower does not exist. It never did.` } },
    activeZones: ['setAsideZone', 'passiveZone', 'legacy', 'leaderZone', 'leaderTechniqueZone', 'hand', 'global', 'deck', 'creationZone', 'board'],
    activeTypes: ['Follower'],
    effectObjs: [
        {
            operation: 'setID',
            value: 'Unperson',
        },
        {
            operation: 'setName',
            value: { english: 'Unperson' },
        },
    ],
}

class UnpersonEffect extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default UnpersonEffect
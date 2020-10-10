import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'NapoleonBonaparte',
    name: {
        english: `Napoleon Bonaparte`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['The People'],
    collectable: true,
    cost: 0,
    health: 8,
    leaderTechniqueID: 'NapoleonBonaparteLeveeEnMasse',
    staticText: {
        english: ``,
    },
    text: {
        templates: {
            english: ``,
        },
    },
    starter: true
}

class NapoleonBonaparte extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NapoleonBonaparte
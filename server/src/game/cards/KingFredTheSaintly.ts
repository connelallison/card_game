import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'KingFredTheSaintly',
    name: {
        english: `King Fred, the Saintly`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['The People'],
    collectable: true,
    cost: 0,
    attack: 1,
    health: 8,
    leaderTechniqueID: 'KingFredTheSaintlyRecruit',
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

class KingFredTheSaintly extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default KingFredTheSaintly
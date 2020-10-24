import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'JosephStalin',
    name: {
        english: `Joseph Stalin`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['Infamy'],
    collectable: true,
    starter: true,
    cost: 2,
    health: 5,
    leaderTechniqueID: 'JosephStalinPurge',
    staticText: {
        english: `Starter`,
    },
    text: {
        templates: {
            english: `Starter`,
        },
    },
}

class JosephStalin extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JosephStalin
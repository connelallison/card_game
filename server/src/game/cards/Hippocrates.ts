import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'Hippocrates',
    name: {
        english: `Hippocrates`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['Learning'],
    collectable: true,
    starter: true,
    cost: 2,
    health: 5,
    leaderTechniqueID: 'HippocratesMedicine',
    staticText: {
        english: `Starter`,
    },
    text: {
        templates: {
            english: `Starter`,
        },
    },
}

class Hippocrates extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Hippocrates
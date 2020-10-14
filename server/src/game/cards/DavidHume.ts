import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'DavidHume',
    name: {
        english: `David Hume`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['Learning'],
    collectable: true,
    cost: 2,
    health: 5,
    leaderTechniqueID: 'DavidHumeOrganiseThoughts',
    staticText: {
        english: `Starter`,
    },
    text: {
        templates: {
            english: `Starter`,
        },
    },
    starter: true,

}

class DavidHume extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default DavidHume
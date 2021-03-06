import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'CosimoDeMedici',
    name: {
        english: `Cosimo de' Medici`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['Economy'],
    collectable: true,
    starter: true,
    cost: 2,
    health: 5,
    leaderTechniqueID: 'CosimoDeMediciBank',
    staticText: {
        english: `Starter`,
    },
    text: {
        templates: {
            english: `Starter`,
        },
    },
}

class CosimoDeMedici extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CosimoDeMedici
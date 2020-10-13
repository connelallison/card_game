import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'NelsonMandela',
    name: {
        english: `Nelson Mandela`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['The People'],
    collectable: true,
    starter: true,
    cost: 2,
    health: 5,
    leaderTechniqueID: 'NelsonMandelaTruthAndReconciliation',
    staticText: {
        english: `Starter`,
    },
    text: {
        templates: {
            english: `Starter`,
        },
    },
}

class NelsonMandela extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NelsonMandela
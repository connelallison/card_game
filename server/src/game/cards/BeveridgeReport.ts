import WorkCreation, { WorkCreationData } from "../gameObjects/WorkCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WorkCreationData = {
    id: 'BeveridgeReport',
    name: {
        english: `Beveridge Report`,
    },
    type: 'Creation',
    subtype: 'Work',
    classes: ['Economy'],
    collectable: true,
    cost: 1,
    charges: 3,
    staticText: {
        english: `Rent 1 \nAt the end of your turn, Nourish 1 Health to your followers.`,
    },
    text: {
        templates: {
            english: `Rent 1 \nAt the end of your turn, Nourish 1 Health to your followers.`,
        },
    },
    stats: {
        Rent: 1,
    },
    effects: ['BeveridgeReportTrigger'],
}

class BeveridgeReport extends WorkCreation {
    static readonly data: WorkCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BeveridgeReport
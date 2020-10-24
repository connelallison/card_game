import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'MuiTsai',
    name: {
        english: `Mui Tsai`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Woman'],
    collectable: true,
    cost: 3,
    attack: 2,
    health: 1,
    charges: 2,
    staticText: {
        english: `Action: Draw a card.`,
    },
    text: {
        templates: {
            english: `Action: Draw a card.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'MuiTsaiAction',
            name: { english: 'Mui Tsai Action' },
            text: { templates: { english: `Action: Draw a card.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    deathEvents: [],
}

class MuiTsai extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MuiTsai
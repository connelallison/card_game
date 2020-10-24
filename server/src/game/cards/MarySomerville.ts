import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'MarySomerville',
    name: {
        english: `Mary Somerville`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: ['Noble', 'Woman'],
    collectable: true,
    cost: 1,
    attack: 1,
    health: 3,
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
            id: 'MarySomervilleAction',
            name: { english: 'Mary Somerville Action' },
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

class MarySomerville extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MarySomerville
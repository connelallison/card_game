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
        english: `Eureka: Draw a card.`,
    },
    text: {
        templates: {
            english: `Eureka: Draw a card.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'MarySomervilleEureka',
            name: { english: 'Mary Somerville Eureka' },
            text: { templates: { english: `Eureka: Draw a card.` } },
            actionType: 'actionAction',
            eureka: true,
            actionSteps: [
                {
                    activeRequirements: [
                        {
                            activeRequirement: 'eureka',
                        },
                    ],
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
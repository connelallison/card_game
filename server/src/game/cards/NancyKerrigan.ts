import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'NancyKerrigan',
    name: {
        english: `Nancy Kerrigan`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Woman'],
    collectable: true,
    cost: 2,
    attack: 3,
    health: 7,
    staticText: {
        english: `Event: This takes 5 damage.`,
    },
    text: {
        templates: {
            english: `Event: This takes 5 damage.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'NancyKerriganEvent',
            name: { english: 'Nancy Kerrigan Event' },
            text: { templates: { english: `Event: This takes 5 damage.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'damage',
                            values: {
                                damage: 5,
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'self'
                            }
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class NancyKerrigan extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NancyKerrigan
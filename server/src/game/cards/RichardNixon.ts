import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'RichardNixon',
    name: {
        english: `Richard Nixon`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Economy'],
    categories: [],
    collectable: true,
    cost: 4,
    attack: 3,
    health: 3,
    staticText: {
        english: `Event: Reduce the cost of both players' hands by (1).`,
    },
    text: {
        templates: {
            english: `Event: Reduce the cost of both players' hands by (1).`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'RichardNixonEvent',
            name: { english: 'Richard Nixon Event' },
            text: { templates: { english: `Event: Reduce the cost of both players' hands by (1).` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'reduceCost',
                            values: {
                                money: 1,
                                effectName: { english: 'Nixon Shock' },
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyHand', 'enemyHand'],
                            }
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class RichardNixon extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default RichardNixon
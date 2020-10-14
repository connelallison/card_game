import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'HelenOfTroy',
    name: {
        english: `Helen Of Troy`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Woman', 'Legend'],
    collectable: true,
    cost: 3,
    attack: 4,
    health: 2,
    staticText: {
        english: `Event: Both players draw two cards.`,
    },
    text: {
        templates: {
            english: `Event: Both players draw two cards.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'HelenOfTroyEvent',
            name: { english: 'Helen Of Troy Event' },
            text: { templates: { english: 'Event: Both players draw two cards.' } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                number: 2,
                                forOpponent: false,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                number: 2,
                                forOpponent: true,
                            },
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class HelenOfTroy extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HelenOfTroy
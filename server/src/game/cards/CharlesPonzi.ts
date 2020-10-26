import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'CharlesPonzi',
    name: {
        english: `Charles Ponzi`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Underclass'],
    collectable: true,
    cost: 4,
    attack: 3,
    health: 3,
    staticText: {
        english: `Action: Draw a card. If you play it this turn, draw a more expensive one, with the same condition.`,
    },
    text: {
        templates: {
            english: `Action: Draw a card. If you play it this turn, draw a more expensive one, with the same condition.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'CharlesPonziAction',
            name: { english: 'Charles Ponzi Action' },
            text: { templates: { english: `Action: Draw a card. If you play it this turn, draw a more expensive one, with the same condition.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'CharlesPonziTrigger',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'stored',
                                param: 'drawnCards'
                            }
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    deathEvents: [],
}

class CharlesPonzi extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CharlesPonzi
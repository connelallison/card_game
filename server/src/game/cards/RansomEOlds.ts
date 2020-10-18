import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'RansomEOlds',
    name: {
        english: `Ransom E. Olds`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: [],
    collectable: true,
    cost: 6,
    attack: 6,
    health: 6,
    staticText: {
        english: `Event: Your (leader) techniques are Repeatable this turn.`,
    },
    text: {
        templates: {
            english: `Event: Your (leader) techniques are Repeatable this turn.`,
        },
    },
    tooltips: ['repeatable'],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'RansomEOldsEvent',
            name: { english: 'Ransom E. Olds Event' },
            text: { templates: { english: `Event: Your (leader) techniques are Repeatable this turn.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'RansomEOldsAura',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'friendlyPlayer'
                            }
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class RansomEOlds extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default RansomEOlds
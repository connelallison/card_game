import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'AugusteEscoffier',
    name: {
        english: `Auguste Escoffier`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 2,
    attack: 2,
    health: 3,
    staticText: {
        english: `Action: Shuffle a follower in your hand into your deck. It gains +1/+1 each turn it stays there.`,
    },
    text: {
        templates: {
            english: `Action: Shuffle a follower in your hand into your deck. It gains +1/+1 each turn it stays there.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'AugustEscoffierAction',
            name: { english: 'Auguste Escoffier Action' },
            text: { templates: { english: `Action: Shuffle a follower in your hand into your deck. It gains +1/+1 each turn it stays there.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'AugusteEscoffierTrigger',
                            },
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'shuffleIntoDeck',
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a follower to shuffle into your deck.' } },
                            hostile: false,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'friendlyHand',
                                requirements: [
                                    {
                                        targetRequirement: 'isType',
                                        values: {
                                            type: 'Follower',
                                        }
                                    },
                                ]
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    deathEvents: [],
}

class AugusteEscoffier extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AugusteEscoffier
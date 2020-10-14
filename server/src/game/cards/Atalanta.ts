import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'Atalanta',
    name: {
        english: `Atalanta`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Legend', 'Woman'],
    collectable: true,
    cost: 2,
    attack: 3,
    health: 1,
    staticText: {
        english: `Event: Draw the follower in your deck with the highest Attack.`,
    },
    text: {
        templates: {
            english: `Event: Draw the follower in your deck with the highest Attack.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'AtalantaEvent',
            name: { english: 'Atalanta Event' },
            text: { templates: { english: `Event: Draw the follower in your deck with the highest Attack.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                targetRequirements: [
                                    {
                                        targetRequirement: 'isDynamicTarget',
                                        values: {
                                            dynamicTarget: {
                                                valueType: 'target',
                                                from: 'targets',
                                                criterionMap: 'attack',
                                                reducer: 'max',
                                                targets: {
                                                    valueType: 'targets',
                                                    from: 'targetDomain',
                                                    targetDomain: 'friendlyDeck',
                                                    requirements: [
                                                        {
                                                            targetRequirement: 'isType',
                                                            values: {
                                                                type: 'Follower',
                                                            }
                                                        },
                                                    ],
                                                }
                                            }
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
    deathEvents: [],
}

class Atalanta extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Atalanta
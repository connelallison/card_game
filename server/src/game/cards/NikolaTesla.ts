import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'NikolaTesla',
    name: {
        english: `Nikola Tesla`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 2,
    staticText: {
        english: `Eureka: Reduce the Cost of a Tech follower in your hand by (2).`,
    },
    text: {
        templates: {
            english: `Eureka: Reduce the Cost of a Tech follower in your hand by (2).`,
        },
    },
    actions: [{
        actionType: 'actionAction',
        id: 'NikolaTeslaEureka',
        name: {
            english: 'Nikola Tesla Eureka'
        },
        text: {
            templates: {
                english: 'Eureka: Reduce the Cost of a Tech follower in your hand by (2).'
            }
        },
        eureka: true,
        actionSteps: [{
            manualTargets: [{
                text: { templates: { english: 'Choose a Tech follower to discount.' } },
                targets: {
                    valueType: 'targets',
                    from: 'targetDomain',
                    targetDomain: 'friendlyHand',
                    requirements: [
                        {
                            targetRequirement: 'isType',
                            values: {
                                type: 'Follower'
                            }
                        },
                        {
                            targetRequirement: 'isCategory',
                            values: {
                                category: 'Tech'
                            }
                        }
                    ]
                }
            }],
            requirements: [{
                activeRequirement: 'eureka'
            }],
            // activeHighlight: true,
            actionFunctions: [{
                functionType: 'manualAction',
                operation: 'reduceCost',
                values: {
                    money: 2,
                    buffName: { english: 'Nikola Tesla Discount' },
                }
            }]
        }]
    }],
}

class NikolaTesla extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NikolaTesla
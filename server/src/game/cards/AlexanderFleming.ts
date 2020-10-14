import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'AlexanderFleming',
    name: {
        english: `Alexander Fleming`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 4,
    attack: 4,
    health: 5,
    staticText: {
        english: `Eureka: Restore a friendly follower to full health.`,
    },
    text: {
        templates: {
            english: `Eureka: Restore a friendly follower to full health.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'AlexanderFlemingEureka',
            name: { english: 'Alexander Fleming Eureka' },
            text: { templates: { english: 'Eureka: Restore a friendly follower to full health.' } },
            actionType: 'actionAction',
            eureka: true,
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'healRelativeToNumber',
                            values: {
                                numberMap: 'missingHealth',
                            }
                        },
                    ],
                    activeRequirements: [
                        {
                            activeRequirement: 'eureka',
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a friendly follower to fully heal.' } },
                            hostile: false,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'friendlyBoard',
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

class AlexanderFleming extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AlexanderFleming
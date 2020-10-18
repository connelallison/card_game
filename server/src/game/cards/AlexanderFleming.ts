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
    cost: 3,
    attack: 3,
    health: 4,
    staticText: {
        english: `Action: Restore a friendly follower to full health.`,
    },
    text: {
        templates: {
            english: `Action: Restore a friendly follower to full health.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'AlexanderFlemingAction',
            name: { english: 'Alexander Fleming Action' },
            text: { templates: { english: 'Action: Restore a friendly follower to full health.' } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'heal',
                            values: {
                                numberMap: 'missingHealth',
                            }
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
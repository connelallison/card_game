import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
    id: 'DivideAndConquer',
    name: {
        english: `Divide And Conquer`,
    },
    type: 'Moment',
    subtype: 'Action',
    classes: ['Empire'],
    collectable: true,
    cost: 3,
    staticText: {
        english: `Action: Choose two followers. The first attacks the second.`,
    },
    text: {
        templates: {
            english: `Action: Choose two followers. The first attacks the second.`,
        },
    },
    actions: [{
        actionType: 'actionAction',
        name: {
            english: 'Divide And Conquer'
        },
        text: {
            templates: {
                english: `Action: Choose two followers. The first attacks the second.`,
            },
        },
        actionSteps: [{
            manualTargets: [
                {
                    minUnique: 2,
                    hostile: true,
                    targets: {
                        valueType: 'targets',
                        from: 'targetDomain',
                        targetDomain: ['enemyBoard', 'friendlyBoard'],
                    },
                    text: {
                        templates: {
                            english: `Choose the follower that will attack.`,
                        },
                    },
                },
                {
                    minUnique: 2,
                    hostile: true,
                    targets: {
                        valueType: 'targets',
                        from: 'targetDomain',
                        targetDomain: ['enemyBoard', 'friendlyBoard'],
                    },
                    text: {
                        templates: {
                            english: `Choose the follower that will be attacked.`,
                        },
                    },
                },
            ],
            actionFunctions: [{
                functionType: 'manualAction',
                operation: "forceAttack",
                values: {
                    attackTarget: {
                        valueType: 'target',
                        from: 'manualTarget',
                        manualTarget: 1,
                    },
                },
            }]
        }]
    }],
}

class DivideAndConquer extends ActionMoment {
    static readonly data: ActionMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default DivideAndConquer
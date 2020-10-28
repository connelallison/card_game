import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
    id: 'Vaporise',
    name: {
        english: `Vaporise`,
    },
    type: 'Moment',
    subtype: 'Action',
    classes: ['Infamy'],
    collectable: true,
    cost: 5,
    staticText: {
        english: `Action: Completely erase a follower from existence.`,
    },
    text: {
        templates: {
            english: `Action: Completely erase a follower from existence.`,
        },
    },
    tooltips: [],
    actions: [
        {
            id: 'VaporiseAction',
            name: { english: 'Vaporise' },
            text: { templates: { english: `Action: Completely erase a follower from existence.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'vaporise',
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: `Choose a follower to vaporise.` } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['enemyBoard', 'friendlyBoard'],
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
}

class Vaporise extends ActionMoment {
    static readonly data: ActionMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Vaporise
import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
    id: 'StormingOfTheBastille',
    name: {
        english: `Storming of the Bastille`,
    },
    type: 'Moment',
    subtype: 'Action',
    classes: ['The People'],
    collectable: true,
    cost: 4,
    staticText: {
        english: `Mob\nAction: Deal 6 damage.`,
    },
    text: {
        templates: {
            english: `Mob\nAction: Deal $0 damage.`,
        },
        dynamicValues: [
            {
                value: {
                    valueType: 'number',
                    from: 'fervour',
                    base: 6,
                },
                default: 6,
                fervour: true,
            }
        ]
    },
    tooltips: [],
    effects: ['Mob'],
    actions: [
        {
            id: 'StormingOfTheBastilleAction',
            name: { english: 'Storming of the Bastille' },
            text: {
                templates: { english: `Action: Deal $0 damage.` },
                dynamicValues: [
                    {
                        value: {
                            valueType: 'number',
                            from: 'fervour',
                            base: 6,
                        },
                        default: 6,
                        fervour: true,
                    }
                ],
            },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'damage',
                            values: {
                                damage: {
                                    valueType: 'number',
                                    from: 'fervour',
                                    base: 6,
                                },
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a target to damage.' } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyBoard', 'enemyBoard', 'enemyLeader', 'friendlyLeader'],
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
}

class StormingOfTheBastille extends ActionMoment {
    static readonly data: ActionMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default StormingOfTheBastille
import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'HippocratesMedicine',
    name: {
        english: `Medicine`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['Learning'],
    collectable: false,
    cost: 2,
    staticText: {
        english: `Action: Restore 2 Health.`,
    },
    text: {
        templates: {
            english: `Action: Restore $0 Health.`,
        },
        dynamicValues: [
            {
                value: {
                    valueType: 'number',
                    from: 'fervour',
                    base: 2,
                },
                default: 2,
                fervour: true,
            }
        ],
    },
    tooltips: [],
    options: [],
    actions: [
        {
            id: 'HippocratesMedicineAction',
            name: { english: 'Medicine' },
            text: {
                templates: { english: `Action: Restore $0 Health.` },
                dynamicValues: [
                    {
                        value: {
                            valueType: 'number',
                            from: 'fervour',
                            base: 2,
                        },
                        default: 2,
                        fervour: true,
                    }
                ]
            },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'heal',
                            values: {
                                healing: {
                                    valueType: 'number',
                                    from: 'fervour',
                                    base: 2,
                                },
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a character to heal.' } },
                            hostile: false,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyBoard', 'friendlyLeader', 'enemyBoard', 'enemyLeader']
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    effects: [],
}

class HippocratesMedicine extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HippocratesMedicine
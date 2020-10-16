import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
    id: 'ErasmusExchange',
    name: {
        english: `Erasmus Exchange`,
    },
    type: 'Creation',
    subtype: 'Technique',
    classes: ['Learning'],
    collectable: true,
    cost: 1,
    charges: 2,
    staticText: {
        english: `Action: Choose a friendly follower and an enemy follower and swap their Stats.`,
    },
    text: {
        templates: {
            english: `Action: Choose a friendly follower and an enemy follower and swap their Stats.`,
        },
    },
    options: [],
    actions: [
        {
            id: 'ErasmusExchangeAction',
            name: { english: 'Erasmus Exchange' },
            text: { templates: { english: `Action: Choose a friendly follower and an enemy follower and swap their Stats.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'storeValue',
                            values: {
                                param: 'friendlyAttack',
                                value: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'attack',
                                    target: {
                                        valueType: 'target',
                                        from: 'manualTarget',
                                        manualTarget: 0,
                                    },
                                },
                            },
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'storeValue',
                            values: {
                                param: 'friendlyHealth',
                                value: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'health',
                                    target: {
                                        valueType: 'target',
                                        from: 'manualTarget',
                                        manualTarget: 0,
                                    },
                                },
                            },
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'setAttackAndHealth',
                            values: {
                                buffName: { english: 'Erasmus Exchange Effect' },
                                attack: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'attack',
                                    target: {
                                        valueType: 'target',
                                        from: 'manualTarget',
                                        manualTarget: 1,
                                    },
                                },
                                health: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'health',
                                    target: {
                                        valueType: 'target',
                                        from: 'manualTarget',
                                        manualTarget: 1,
                                    },
                                },
                            },
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'setAttackAndHealth',
                            manualTarget: 1,
                            values: {
                                buffName: { english: 'Erasmus Exchange Effect' },
                                attack: {
                                    valueType: 'number',
                                    from: 'stored',
                                    param: 'friendlyAttack',
                                },
                                health: {
                                    valueType: 'number',
                                    from: 'stored',
                                    param: 'friendlyHealth',
                                },
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a friendly follower.' } },
                            hostile: false,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'friendlyBoard',
                            },
                        },
                        {
                            text: { templates: { english: 'Choose an enemy follower.' } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'enemyBoard',
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
}

class ErasmusExchange extends TechniqueCreation {
    static readonly data: TechniqueCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default ErasmusExchange
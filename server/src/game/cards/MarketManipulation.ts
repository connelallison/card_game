import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
    id: 'MarketManipulation',
    name: {
        english: `Market Manipulation`,
    },
    type: 'Creation',
    subtype: 'Technique',
    classes: ['Economy'],
    collectable: true,
    cost: 1,
    charges: 2,
    staticText: {
        english: `Repeatable\nOption: Give all followers +1/+1; or -1/-1.`,
    },
    text: {
        templates: {
            english: `Repeatable\nOption: Give all followers +1/+1; or -1/-1.`,
        },
    },
    options: [
        {
            actionType: 'optionAction',
            id: `MarketManipulationOption`,
            name: { english: `Market Manipulation Option` },
            text: { templates: { english: `Option: Give all followers +1/+1; or -1/-1.` } },
            actions: [
                {
                    id: 'MarketManipulationPump',
                    name: { english: 'Pump' },
                    text: { templates: { english: `Action: Give all followers +1/+1.` } },
                    actionType: 'actionAction',
                    actionSteps: [
                        {
                            actionFunctions: [
                                {
                                    functionType: 'autoAction',
                                    operation: 'buffStats',
                                    values: {
                                        stats: 1,
                                        effectName: { english: 'Market Manipulation Buff' },
                                    },
                                },
                            ],
                            autoTargets: [
                                {
                                    targets: {
                                        valueType: 'targets',
                                        from: 'targetDomain',
                                        targetDomain: ['friendlyBoard', 'enemyBoard'],
                                    }
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'MarketManipulationDump',
                    name: { english: 'Dump' },
                    text: { templates: { english: `Action: Give all followers -1/-1.` } },
                    actionType: 'actionAction',
                    actionSteps: [
                        {
                            actionFunctions: [
                                {
                                    functionType: 'autoAction',
                                    operation: 'debuffStats',
                                    values: {
                                        stats: 1,
                                        effectName: { english: 'Market Manipulation Debuff' },
                                    },
                                },
                            ],
                            autoTargets: [
                                {
                                    targets: {
                                        valueType: 'targets',
                                        from: 'targetDomain',
                                        targetDomain: ['friendlyBoard', 'enemyBoard'],
                                    }
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    ],
    actions: [],
    events: [],
    effects: ['Repeatable'],
}

class MarketManipulation extends TechniqueCreation {
    static readonly data: TechniqueCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MarketManipulation
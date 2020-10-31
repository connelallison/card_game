import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Entrepreneur',
    name: {
        english: `Entrepreneur`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Economy'],
    categories: [],
    collectable: false,
    cost: 2,
    attack: 4,
    health: 5,
    charges: 1,
    staticText: {
        english: `Option: Pay 1 Money now; or Debt 2; or Rent 1.`,
    },
    text: {
        templates: {
            english: `Option: Pay 1 Money now; or Debt 2; or Rent 1.`,
        },
    },
    tooltips: ['debt', 'rent'],
    options: [
        {
            actionType: 'optionAction',
            id: 'EntrepreneurOption',
            name: { english: 'Entrepreneur Option' },
            text: { templates: { english: 'Option: Pay 1 Money now; or Debt 2; or Rent 1.' } },
            actions: [
                {
                    actionType: 'actionAction',
                    id: 'EntrepreneurBootstrap',
                    name: { english: 'Bootstrap' },
                    text: { templates: { english: 'Action: Pay 1 Money now.' } },
                    actionSteps: [{
                        actionFunctions: [{
                            functionType: "autoAction",
                            operation: 'spendMoney',
                            values: {
                                money: 1
                            }
                        }],
                        activeRequirements: [{
                            activeRequirement: "canAfford",
                            values: {
                                cost: {
                                    valueType: "number",
                                    from: "compound",
                                    base: 1,
                                    numberMods: [{
                                        operator: 'add',
                                        value: {
                                            valueType: 'number',
                                            from: 'target',
                                            target: {
                                                valueType: 'target',
                                                from: 'targetDomain',
                                                targetDomain: 'self'
                                            },
                                            numberMap: 'cost'
                                        }
                                    }]
                                }
                            }
                        }]
                    }]
                },
                {
                    actionType: 'actionAction',
                    id: 'EntrepreneurLoan',
                    name: { english: 'Loan' },
                    text: { templates: { english: 'Action: Gain Debt 2' } },
                    actionSteps: [{
                        autoTargets: [{
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'self',
                            }
                        }],
                        actionFunctions: [{
                            functionType: 'autoAction',
                            operation: 'addStatEffect',
                            values: {
                                statValue: 2,
                                statEffectID: 'Debt',
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'forceTargetUpdate',
                        }]
                    }],
                },
                {
                    actionType: 'actionAction',
                    id: 'EntrepreneurVentureCapital',
                    name: { english: 'Venture Capital' },
                    text: { templates: { english: 'Action: Gain Rent 1' } },
                    activeTypes: 'Persistent',
                    actionSteps: [{
                        autoTargets: [{
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'self',
                            },
                        }],
                        actionFunctions: [{
                            functionType: 'autoAction',
                            operation: 'addStatEffect',
                            values: {
                                statValue: 1,
                                statEffectID: 'Rent',
                            },
                        }]
                    }]
                }
            ]
        }
    ]
}

class Entrepreneur extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Entrepreneur
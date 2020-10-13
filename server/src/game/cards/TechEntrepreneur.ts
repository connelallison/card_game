import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'TechEntrepreneur',
    name: {
        english: `Tech Entrepreneur`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Economy'],
    categories: ['Tech'],
    collectable: false,
    cost: 2,
    attack: 4,
    health: 4,
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
    options: [{
        actionType: 'optionAction',
        id: 'TechEntrepreneurOption',
        name: { english: 'Tech Entrepreneur Option' },
        text: { templates: { english: 'Option: Pay 1 Money now; or Debt 2; or Rent 1.' } },
        actions: [
            {
                actionType: 'actionAction',
                id: 'TechEntrepreneurBootstrap',
                name: { english: 'Bootstrap' },
                text: { templates: { english: 'Pay 1 Money now.' } },
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
                id: 'TechEntrepreneurLoan',
                name: { english: 'Loan' },
                text: { templates: { english: 'Debt 2' } },
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
                id: 'TechEntrepreneurVentureCapital',
                name: { english: 'Venture Capital' },
                text: { templates: { english: 'Rent 1' } },
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
    }]
}

class TechEntrepreneur extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TechEntrepreneur
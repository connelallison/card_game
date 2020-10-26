import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Investor',
    name: {
        english: `Investor`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Economy'],
    categories: [],
    collectable: true,
    cost: 1,
    attack: 1,
    health: 1,
    charges: 2,
    staticText: {
        english: `Option: Spend all your Money. For each Money spent, summon a clone of this; or gain +1/+1.`,
    },
    text: {
        templates: {
            english: `Option: Spend all your Money. For each Money spent, summon a clone of this; or gain +1/+1.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [
        {
            actionType: 'optionAction',
            id: `InvestorOption`,
            name: { english: `Investor Option` },
            text: { templates: { english: `Option: Spend all your Money. For each Money spent, summon a clone of this; or gain +1/+1.` } },
            actions: [
                {
                    id: 'InvestorRetail',
                    name: { english: 'Retail' },
                    text: { templates: { english: `Action: Spend all your Money. For each Money spent, summon a clone of this.` } },
                    actionType: 'actionAction',
                    actionSteps: [
                        {
                            actionFunctions: [
                                {
                                    functionType: 'autoAction',
                                    operation: 'spendAllMoneyAndStore',
                                },
                                {
                                    functionType: 'autoAction',
                                    operation: 'createAndSummonClone',
                                    values: {
                                        number: {
                                            valueType: 'number',
                                            from: 'stored',
                                            param: 'moneySpent',
                                        }
                                    },
                                },
                            ],
                            autoTargets: [
                                {
                                    targets: {
                                        valueType: 'target',
                                        from: 'self',
                                    }
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'InvestorInstitutional',
                    name: { english: 'Institutional' },
                    text: { templates: { english: `Action: Spend all your Money. For each Money spent, gain +1/+1.` } },
                    actionType: 'actionAction',
                    actionSteps: [
                        {
                            actionFunctions: [
                                {
                                    functionType: 'autoAction',
                                    operation: 'spendAllMoneyAndStore',
                                },
                                {
                                    functionType: 'autoAction',
                                    operation: 'buffStats',
                                    values: {
                                        stats: {
                                            valueType: 'number',
                                            from: 'stored',
                                            param: 'moneySpent',
                                        },
                                        effectName: { english: 'Institutional Investor Buff' },
                                    },
                                },
                            ],
                            autoTargets: [
                                {
                                    targets: {
                                        valueType: 'target',
                                        from: 'self',
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
    deathEvents: [],
}

class Investor extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Investor
import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
    id: 'NewDeal',
    name: {
        english: `New Deal`,
    },
    type: 'Moment',
    subtype: 'Action',
    classes: ['Economy'],
    collectable: true,
    cost: 2,
    staticText: {
        english: `Action: Permanently increase your Income by your Growth.`,
    },
    text: {
        templates: {
            english: `Action: Permanently increase your Income by your Growth.`,
        },
    },
    tooltips: ['income', 'growth'],
    actions: [
        {
            id: 'NewDealAction',
            name: { english: 'New Deal' },
            text: { templates: { english: `Action: Permanently increase your Income by your Growth.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'modIncome',
                            values: {
                                income: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'ownerGrowth',
                                    target: {
                                        valueType: 'target',
                                        from: 'self'
                                    }
                                }
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
}

class NewDeal extends ActionMoment {
    static readonly data: ActionMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NewDeal
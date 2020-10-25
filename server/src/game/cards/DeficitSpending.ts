import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
    id: 'DeficitSpending',
    name: {
        english: `Deficit Spending`,
    },
    type: 'Creation',
    subtype: 'Technique',
    classes: ['Economy'],
    collectable: true,
    cost: 0,
    charges: 2,
    staticText: {
        english: `Debt 2\nEvent: Gain 2 Money.`,
    },
    text: {
        templates: {
            english: `Debt 2\nEvent: Gain 2 Money.`,
        },
    },
    stats: {
        Debt: 2,
    },
    options: [],
    actions: [],
    events: [
        {
            id: 'DeficitSpendingEvent',
            name: { english: 'Deficit Spending' },
            text: { templates: { english: `Event: Gain 2 Money.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'gainMoney',
                            values: {
                                money: 2,
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class DeficitSpending extends TechniqueCreation {
    static readonly data: TechniqueCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default DeficitSpending
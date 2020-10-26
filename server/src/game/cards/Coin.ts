import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'Coin',
    name: {
        english: `Coin`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['All'],
    collectable: false,
    cost: 0,
    staticText: {
        english: `Event: Gain 1 Money.`,
    },
    text: {
        templates: {
            english: `Event: Gain 1 Money.`,
        },
    },
    tooltips: [],
    events: [
        {
            id: 'CoinEvent',
            name: { english: 'Coin' },
            text: { templates: { english: `Event: Gain 1 Money.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'gainMoney',
                            values: {
                                money: 1,
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class Coin extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Coin
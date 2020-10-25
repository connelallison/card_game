import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'IndustrialRevolution',
    name: {
        english: `Industrial Revolution`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['Economy'],
    collectable: true,
    cost: 10,
    staticText: {
        english: `Event: Permanently gain Growth 1.`,
    },
    text: {
        templates: {
            english: `Event: Permanently gain Growth 1.`,
        },
    },
    tooltips: ['growth'],
    events: [
        {
            id: 'IndustrialRevolutionEvent',
            name: { english: 'IndustrialRevolution' },
            text: { templates: { english: `Event: Permanently gain Growth 1.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'modGrowth',
                            values: {
                                growth: 1,
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class IndustrialRevolution extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default IndustrialRevolution
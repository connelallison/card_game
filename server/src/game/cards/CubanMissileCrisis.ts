import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'CubanMissileCrisis',
    name: {
        english: `Cuban Missile Crisis`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['All'],
    collectable: false,
    cost: 2,
    staticText: {
        english: `Event: Equip Mutually Assured Destruction and end your turn.`,
    },
    text: {
        templates: {
            english: `Event: Equip Mutually Assured Destruction and end your turn.`,
        },
    },
    relatedCard: 'MutuallyAssuredDestruction',
    tooltips: [],
    events: [
        {
            id: 'CubanMissileCrisisEvent',
            name: { english: 'Cuban Missile Crisis' },
            text: { templates: { english: `Event: Equip Mutually Assured Destruction and end your turn.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndSummonCard',
                            values: {
                                cardID: 'MutuallyAssuredDestruction'
                            },
                        },
                        {
                          functionType: 'autoAction',
                          operation: 'forceEndTurn',
                        },
                    ],
                },
            ],
        },
    ],
}

class CubanMissileCrisis extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CubanMissileCrisis
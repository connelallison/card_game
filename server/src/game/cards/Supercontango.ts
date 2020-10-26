import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'Supercontango',
    name: {
        english: `Super-contango`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['Economy'],
    collectable: true,
    cost: 3,
    staticText: {
        english: `Event: Your card costs can be reduced to (-1) this turn.`,
    },
    text: {
        templates: {
            english: `Event: Your card costs can be reduced to (-1) this turn.`,
        },
    },
    tooltips: [],
    events: [
        {
            id: 'SupercontangoEvent',
            name: { english: 'Super-contango' },
            text: { templates: { english: `Event: Your card costs can be reduced to (-1) this turn.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'addEffect',
                          values: {
                              effectID: 'SupercontangoEffect'
                          },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'friendlyPlayer',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class Supercontango extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Supercontango
import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'GeneralStrike1926',
    name: {
        english: `1926 General Strike`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['The People'],
    collectable: true,
    cost: 2,
    staticText: {
        english: `Event: Followers can't attack until the end of your next turn.`,
    },
    text: {
        templates: {
            english: `Event: Followers can't attack until the end of your next turn.`,
        },
    },
    tooltips: [],
    events: [
        {
            id: 'GeneralStrike1926Event',
            name: { english: '1926 General Strike' },
            text: { templates: { english: `Event: Followers can't attack until the end of your next turn.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'GeneralStrike1926Aura'
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'friendlyLeader'
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class GeneralStrike1926 extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default GeneralStrike1926
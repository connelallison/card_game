import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'BostonTeaParty',
    name: {
        english: `Boston Tea Party`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['The People'],
    collectable: true,
    cost: 3,
    staticText: {
        english: `Event: Summon three 1/1 Citizens and give them Mob.`,
    },
    text: {
        templates: {
            english: `Event: Summon three 1/1 Citizens and give them Mob.`,
        },
    },
    tooltips: ['mob'],
    events: [
        {
            id: 'BostonTeaPartyEvent',
            name: { english: 'Boston Tea Party' },
            text: { templates: { english: `Event: Summon three 1/1 Citizens and give them Mob.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndSummonCard',
                            values: {
                                cardID: 'Citizen',
                                number: 3,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'Mob',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'stored',
                                param: 'createdCards'
                            }
                        },
                    ]
                },
            ],
        },
    ],
}

class BostonTeaParty extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BostonTeaParty
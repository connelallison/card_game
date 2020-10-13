import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
    id: 'Collectivisation',
    name: {
        english: `Collectivisation`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['The People'],
    collectable: true,
    cost: 3,
    staticText: {
        english: `Event: Average the Stats of all followers.`,
    },
    text: {
        templates: {
            english: `Event: Average the Stats of all followers.`,
        },
    },
    tooltips: [],
    events: [
        {
            id: 'CollectivisationEvent',
            name: { english: 'Collectivisation' },
            text: { templates: { english: `Event: Average the Stats of all followers.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'setStats',
                            values: {
                                stats: {
                                    valueType: 'number',
                                    from: 'numbers',
                                    reducer: 'average',
                                    numbers: {
                                        valueType: 'numbers',
                                        from: 'numbersArray',
                                        numbers: [
                                            {
                                                valueType: 'numbers',
                                                from: 'targets',
                                                targets: {
                                                    valueType: 'targets',
                                                    from: 'targetDomain',
                                                    targetDomain: ['friendlyBoard', 'enemyBoard'],
                                                },
                                                numberMap: 'attack'
                                            },
                                            {
                                                valueType: 'numbers',
                                                from: 'targets',
                                                targets: {
                                                    valueType: 'targets',
                                                    from: 'targetDomain',
                                                    targetDomain: ['friendlyBoard', 'enemyBoard'],
                                                },
                                                numberMap: 'health'
                                            },
                                        ]
                                    }
                                }
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyBoard', 'enemyBoard'],
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class Collectivisation extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Collectivisation
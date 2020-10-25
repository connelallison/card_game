import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import { countFriendlyFollowers } from '../dictionaries/DynamicValueShortcuts'

const data: EventMomentData = {
    id: 'BattleOfSuiyang',
    name: {
        english: `Battle of Suiyang`,
    },
    type: 'Moment',
    subtype: 'Event',
    classes: ['Infamy'],
    cost: 2,
    collectable: true,
    staticText: {
        english: `Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.`,
    },
    text: {
        templates: {
            english: `Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.`,
        },
    },
    events: [{
        actionType: 'eventAction',
        id: 'BattleOfSuiyangEvent',
        name: {
            english: 'Battle of Suiyang'
        },
        text: {
            templates: {
                english: `Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.`,
            },
        },
        actionSteps: [{
            autoTargets: [
                {
                    targets: {
                        valueType: 'targets',
                        from: 'targetDomain',
                        targetDomain: 'friendlyBoard',
                    },
                },
                {
                    targets: {
                        valueType: 'targets',
                        from: 'targetDomain',
                        targetDomain: 'friendlyHand',
                        requirements: [
                            {
                                targetRequirement: 'isType',
                                values: {
                                    type: 'Follower',
                                }
                            },
                        ],
                    },
                    optional: true,
                }],
            actionFunctions: [
                {
                    functionType: 'autoAction',
                    operation: 'storeValue',
                    values: {
                        param: 'targetCount',
                        value: countFriendlyFollowers,
                    },
                },
                {
                    functionType: 'autoAction',
                    operation: 'markDestroyed',
                    autoTarget: 0,
                },
                {
                    functionType: 'autoAction',
                    operation: 'forceDeathPhase',
                },
                {
                    functionType: 'autoAction',
                    operation: 'buffStats',
                    autoTarget: 1,
                    values: {
                        effectName: { english: 'Battle of Suiyang Buff' },
                        'stats': {
                            valueType: 'number',
                            from: 'stored',
                            param: 'targetCount'
                        }
                    },
                }
            ]
        }]
    }],
}

class BattleOfSuiyang extends EventMoment {
    static readonly data: EventMomentData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BattleOfSuiyang
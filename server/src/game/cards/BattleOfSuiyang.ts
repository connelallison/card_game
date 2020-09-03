import EventMoment from '../gameObjects/EventMoment'

class BattleOfSuiyang extends EventMoment {
    static readonly data: {
        'id': 'BattleOfSuiyang',
        'name': 'Battle of Suiyang',
        'type': 'Moment',
        'subtype': 'Event',
        'cost': 2,
        'collectable': true,
        'staticCardText': 'Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.',
        'playRequirements': [{
            'playRequirement': 'min1FriendlyFollower',
        }],
        'events': [[
            {
                'actionType': 'autoAction',
                'operation': 'storeValue',
                'values': {
                    'name': 'targetCount',
                    'value': {
                        'valueType': 'number',
                        'from': 'numbers',
                        'reducer': 'count',
                        'numbers': {
                            'valueType': 'numbers',
                            'from': 'targets',
                            'numberMap': 'count',
                            'targets': {
                                'valueType': 'targets',
                                'from': 'targetDomain',
                                'targetDomain': 'friendlyBoard'
                            },
                        }
                    },
                },
            },
            {
                'actionType': 'autoAction',
                'operation': 'markDestroyed',
                'targets': {
                    'valueType': 'targets',
                    'from': 'targetDomain',
                    'targetDomain': 'friendlyBoard',
                },
            },
            {
                'actionType': 'autoAction',
                'operation': 'forceDeathPhase',
            },
            {
                'actionType': 'autoAction',
                'operation': 'buffCharacterAttackAndHealth',
                'stored': {
                    'stats': 'targetCount'
                },
                'targets': {
                    'valueType': 'targets',
                    'from': 'targetDomain',
                    'targetDomain': 'friendlyHand',
                },
            }
        ]],
    }

    constructor(game: Game, owner: GamePlayer) {
        super(
            game,
            owner,
            {
                'id': 'BattleOfSuiyang',
                'name': 'Battle of Suiyang',
                'type': 'Moment',
                'subtype': 'Event',
                'cost': 2,
                'collectable': true,
                'staticCardText': 'Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.',
                'playRequirements': [{
                    'playRequirement': 'min1FriendlyFollower',
                }],
                'events': [[
                    {
                        'actionType': 'autoAction',
                        'operation': 'storeValue',
                        'values': {
                            'name': 'targetCount',
                            'value': {
                                'valueType': 'number',
                                'from': 'numbers',
                                'reducer': 'count',
                                'numbers': {
                                    'valueType': 'numbers',
                                    'from': 'targets',
                                    'numberMap': 'count',
                                    'targets': {
                                        'valueType': 'targets',
                                        'from': 'targetDomain',
                                        'targetDomain': 'friendlyBoard'
                                    },
                                }
                            },
                        },
                    },
                    {
                        'actionType': 'autoAction',
                        'operation': 'markDestroyed',
                        'targets': {
                            'valueType': 'targets',
                            'from': 'targetDomain',
                            'targetDomain': 'friendlyBoard',
                        },
                    },
                    {
                        'actionType': 'autoAction',
                        'operation': 'forceDeathPhase',
                    },
                    {
                        'actionType': 'autoAction',
                        'operation': 'buffCharacterAttackAndHealth',
                        'stored': {
                            'stats': 'targetCount'
                        },
                        'targets': {
                            'valueType': 'targets',
                            'from': 'targetDomain',
                            'targetDomain': 'friendlyHand',
                        },
                    }
                ]],
            }
        )
    }
}
export default BattleOfSuiyang

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'

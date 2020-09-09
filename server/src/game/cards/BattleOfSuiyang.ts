import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'

const data: EventMomentData = {
    'id': 'BattleOfSuiyang',
    'name': 'Battle of Suiyang',
    'type': 'Moment',
    'subtype': 'Event',
    'cost': 2,
    'collectable': true,
    'targeted': false,
    'staticCardText': 'Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.',
    'activeRequirements': [{
        'activeRequirement': 'min1FriendlyFollower',
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
            'operation': 'buffStats',
            'values': {
                'stats': {
                    'valueType': 'number',
                    'from': 'stored',
                    'param': 'targetCount'
                }
            },
            'targets': {
                'valueType': 'targets',
                'from': 'targetDomain',
                'targetDomain': 'friendlyHand',
            },
        }
    ]],
}

class BattleOfSuiyang extends EventMoment {
    static readonly data: EventMomentData = data

    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BattleOfSuiyang

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
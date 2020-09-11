import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import { countFriendlyFollowers } from '../dictionaries/DynamicValueShortcuts'

const data: EventMomentData = {
    'id': 'BattleOfSuiyang',
    'name': {
        'english': `Battle of Suiyang`,
    },
    'type': 'Moment',
    'subtype': 'Event',
    'classes': ['Infamy'],
    'cost': 2,
    'collectable': true,
    'targeted': false,
    'staticCardText': {
        'english': `Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.`,
        },
    },
    'activeRequirements': [{
        'activeRequirement': 'min1FriendlyFollower',
    }],
    'events': [[
        {
            'actionType': 'autoAction',
            'operation': 'storeValue',
            'values': {
                'param': 'targetCount',
                'value': countFriendlyFollowers,
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
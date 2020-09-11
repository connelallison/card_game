import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEnchantmentData = {
    'id': 'HolyBookTrigger',
    'name': {
        'english': `Holy Book Trigger`,
    },
    'type': 'Enchantment',
    'subtype': 'Trigger',
    'repeatable': true,
    'wonderTrigger': false,
    'activeZones': ['creationZone'],
    'activeTypes': ['Creation'],
    'triggerObjs': [{
        'eventType': 'endOfTurn',
        'requirements': [{
            'activeRequirement': 'isMyTurn'
        }],
        'actions': [{
            actionType: 'autoAction',
            operation: 'heal',
            values: {
                'healing': 2,
            },
            targets: {
                valueType: 'targets',
                from: 'targetDomain',
                targetDomain: ['friendlyBoard', 'friendlyLeader']
            }
        }]
    }]
}

class HolyBookTrigger extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HolyBookTrigger
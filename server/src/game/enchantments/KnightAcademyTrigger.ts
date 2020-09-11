import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEnchantmentData = {
    'id': 'KnightAcademyTrigger',
    'name': {
        'english': `Knight Academy Trigger`,
    },
    'type': 'Enchantment',
    'subtype': 'Trigger',
    'repeatable': true,
    'wonderTrigger': true,
    'activeZones': ['creationZone'],
    'activeTypes': ['Creation'],
    'triggerObjs': [{
        'eventType': 'afterDraw',
        'requirements': [
            {
                'activeRequirement': 'canSummonType',
                'values': {
                    'type': 'Follower',
                }
            },
            {
                'targetRequirement': 'isType',
                'values': {
                    'type': 'Follower'
                },
                'targetMap': 'drawEventDrawnCard'
            },
            {
                'targetRequirement': 'isFriendly',
                'targetMap': 'drawEventDrawnCard'
            }
        ],
        'actions': [{
            actionType: 'autoAction',
            operation: 'summonCard',
            values: {
                'cardID': 'Knight'
            }
        }]
    }]
}

class KnightAcademyTrigger extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default KnightAcademyTrigger
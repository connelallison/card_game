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
        'actionType': 'triggerAction',
        'eventType': 'afterDraw',
        'requirements': [
            {
                'activeRequirement': 'canSummonType',
                'values': {
                    'type': 'Follower',
                }
            },
            {
                'eventTargetRequirement': 'isType',
                'values': {
                    'type': 'Follower'
                },
                'targetMap': 'drawEventDrawnCard'
            },
            {
                'eventTargetRequirement': 'isFriendly',
                'targetMap': 'drawEventDrawnCard'
            }
        ],
        'actionFunctions': [{
            functionType: 'autoAction',
            operation: 'createAndSummonCard',
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
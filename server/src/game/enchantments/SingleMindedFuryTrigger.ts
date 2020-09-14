import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
import { lastEnemyFollowerEnteredPlay } from "../dictionaries/DynamicValueShortcuts";

const data: TriggerEnchantmentData = {
    'id': 'SingleMindFuryTrigger',
    'name': {
        'english': `Single-Minded Fury Trigger`,
    },
    'type': 'Enchantment',
    'subtype': 'Trigger',
    'activeZones': ['passiveZone'],
    'activeTypes': ['Passive'],
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'beforeDamage',
        requirements: [{
            targetMap: 'damageEventDamagedTarget',
            eventTargetRequirement: 'isDynamicTarget',
            values: {
                dynamicTarget: lastEnemyFollowerEnteredPlay
            }
        }],
        actionFunctions: [{
            functionType: 'eventModAction',
            operation: 'incrementNumberParam',
            values: {
                param: 'damage',
                value: 1
            }
        }]
    }]
}

class SingleMindedFuryTrigger extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SingleMindedFuryTrigger
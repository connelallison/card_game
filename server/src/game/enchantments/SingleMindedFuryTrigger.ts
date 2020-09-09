import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";

const data: TriggerEnchantmentData = {
    'id': 'SingleMindFuryTrigger',
    'name': 'Single-Minded Fury Trigger',
    'type': 'Enchantment',
    'subtype': 'Trigger',
    'activeZones': ['passiveZone'],
    'activeTypes': ['Passive'],
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [{
        eventType: 'beforeDamage',
        requirements: [{
            targetMap: 'damageEventDamagedTarget',
            targetRequirement: 'isDynamicTarget',
            values: {
                dynamicTarget: {
                    valueType: 'target',
                    from: 'targets',
                    reducer: 'last',
                    targets: {
                        valueType: 'targets',
                        from: 'events',
                        targetMap: 'enterPlayEventPlayedCard',
                        requirements: [{
                            targetRequirement: 'isEnemy'
                        },
                        {
                            targetRequirement: 'isType',
                            values: {
                                type: 'Follower'
                            }
                        },
                        {
                            targetRequirement: 'inZone',
                            values: {
                                zone: 'board'
                            }
                        }],
                        events: {
                            valueType: 'events',
                            from: 'eventDomain',
                            eventDomain: 'enterPlayEvents'
                        }
                    }
                }
            }
        }],
        actions: [{
            actionType: 'eventModAction',
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

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

//     'SingleMindedFuryTrigger',
//     'Single-Minded Fury Trigger',
//     ['passiveZone'],
//     ['Passive'],
//     [],
//     true,
//     [{
//         eventType: 'beforeDamage',
//         requirements: [{
//             targetMap: 'damageEventDamagedTarget',
//             targetRequirement: 'isDynamicTarget',
//             values: {
//                 dynamicTarget: ({
//                     valueType: 'target',
//                     from: 'targets',
//                     reducer: 'last',
//                     targets: {
//                         valueType: 'targets',
//                         from: 'events',
//                         targetMap: 'enterPlayEventPlayedCard',
//                         requirements: [{
//                             targetRequirement: 'isEnemy',
//                         }, {
//                             targetRequirement: 'isType',
//                             values: {
//                                 type: 'Follower',
//                             },
//                         }, {
//                             targetRequirement: 'inZone',
//                             values: {
//                                 zone: 'board',
//                             },
//                         }],
//                         events: {
//                             valueType: 'events',
//                             from: 'eventDomain',
//                             eventDomain: 'enterPlayEvents',

//                         }
//                     }
//                 })
//             }
//         }],
//         actions: [{
//             actionType: 'eventModAction',
//             operation: 'incrementNumberParam',
//             values: {
//                 param: 'damage',
//                 value: 1,
//             }
//         }]
//     }],
//     false,
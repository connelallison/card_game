import Game from "../gamePhases/Game";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import GameObject from "../gameObjects/GameObject";

class SingleMindedFuryTrigger extends TriggerEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'SingleMindedFuryTrigger',
            'Single-Minded Fury Trigger',
            ['passiveZone'],
            ['Passive'],
            [],
            true,
            [{
                eventType: 'beforeDamage',
                requirements: [{
                    targetMap: 'damageEventDamagedTarget',
                    targetRequirement: 'isDynamicTarget',
                    values: {
                        dynamicTarget: ({
                            valueType: 'target',
                            from: 'targets',
                            reducer: 'last',
                            targets: {
                                valueType: 'targets',
                                from: 'events',
                                targetMap: 'enterPlayEventPlayedCard',
                                requirements: [{
                                    targetRequirement: 'isEnemy',
                                }, {
                                    targetRequirement: 'isType',
                                    values: {
                                        type: 'Follower',
                                    },
                                }, {
                                    targetRequirement: 'inZone',
                                    values: {
                                        zone: 'board',
                                    },
                                }],
                                events: {
                                    valueType: 'events',
                                    from: 'eventDomain',
                                    eventDomain: 'enterPlayEvents',

                                }
                            }
                        })
                    }
                }],
                actions: [{
                    actionType: 'eventModAction',
                    operation: 'incrementNumberParam',
                    values: {
                        param: 'damage',
                        value: 1,
                    }
                }]
            }],
            false,
        )
    }
}

export default SingleMindedFuryTrigger
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Passive from "../gameObjects/Passive";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import DynamicTargetObject from "../structs/DynamicTargetObject";
import DamageEvent from "../gameEvents/DamageEvent";

class SingleMindedFuryTrigger extends TriggerEnchantment {
    owner: Passive

    constructor(game: Game, owner: Card) {
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
                    targetRequirement: 'isDynamicTarget',
                    values: {
                        dynamicTarget: ({
                            valueType: 'target',
                            reducer: 'last',
                            requirements: [{
                                targetRequirement: 'isEnemy',
                                targetMap: (event: EnterPlayEvent) => event.card,
                            }, {
                                targetRequirement: 'isType',
                                values: {
                                    type: 'Follower',
                                },
                                targetMap: (event: EnterPlayEvent) => event.card
                            }, {
                                targetRequirement: 'inZone',
                                values: {
                                    zone: 'board',
                                },
                                targetMap: (event: EnterPlayEvent) => event.card
                            }],
                            targetDomain: 'enterPlayEvents',
                            resultMap: (event) => event.card,
                        } as DynamicTargetObject)
                    },
                    eventMap: (event: DamageEvent) => event.target
                }],
                actions: [{
                    operation: 'incrementEventParam',
                    values: {
                        param: 'damage',
                        value: 1,
                    }
                }]
            }]
        )
    }
}

export default SingleMindedFuryTrigger
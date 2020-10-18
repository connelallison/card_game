import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'NikaRioterTrigger',
    name: {
        english: `Nika Rioter Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After another Nika Rioter enters play, attack it.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterEnterPlay',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isSpecificCardClass',
                            targetMap: 'enterPlayEventPlayedCard',
                            values: {
                                cardID: 'NikaRioter',
                            }
                        },
                        {
                            eventTargetRequirement: 'isNotSelf',
                            targetMap: 'enterPlayEventPlayedCard',
                        }
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'forceAttack',
                            values: {
                                attackTarget: {
                                    valueType: 'target',
                                    from: 'event',
                                    event: {
                                        valueType: 'event',
                                        from: 'actionEventEvent',
                                    },
                                    targetMap: 'enterPlayEventPlayedCard',
                                }
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'self',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class NikaRioterTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default NikaRioterTrigger
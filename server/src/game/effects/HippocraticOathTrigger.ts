import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'HippocraticOathTrigger',
    name: {
        english: `Hippocratic Oath Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `Passive: Your damage and healing to friendly characters are never rot and always nourish.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'beforeHealing',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'eventModAction',
                            operation: 'setBooleanParam',
                            values: {
                                param: 'nourish',
                                value: true,
                            },
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'healingEventHealedTarget',
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'healingEventCharSource',
                        },
                    ]
                },
            ],
        },
        {
            actionType: 'triggerAction',
            eventType: 'beforeDamage',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'eventModAction',
                            operation: 'setBooleanParam',
                            values: {
                                param: 'rot',
                                value: false,
                            },
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'damageEventDamagedTarget',
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'damageEventCharSource',
                        },
                    ]
                },
            ],
        },
    ],
}

class HippocraticOathTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HippocraticOathTrigger
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
            english: `Passive: All healing to friendly characters is nourish healing.`,
        },
        dynamicValues: [],
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
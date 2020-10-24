import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'AlfredNobelTrigger',
    name: {
        english: `Alfred Nobel Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: ['legacy'],
    text: {
        templates: {
            english: `Legacy: Before you play a creation, give it Fortune.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'beforePlay',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'playEventPlayedCard',
                            operation: 'addEffect',
                            values: {
                                effectID: 'Fortune',
                            }
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isType',
                            targetMap: 'playEventPlayedCard',
                            values: {
                                type: 'Creation',
                            }
                        },
                        {
                          eventTargetRequirement: 'isFriendly',
                          targetMap: 'playEventPlayer',
                        },
                    ]
                },
            ],
        },
    ],
}

class AlfredNobelTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default AlfredNobelTrigger
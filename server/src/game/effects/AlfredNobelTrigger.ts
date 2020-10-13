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
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After you play a technique, give it +2 charges.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterPlay',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'playEventPlayedCard',
                            operation: 'addCharge',
                            values: {
                                charges: 2,
                            },
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isSubtype',
                            targetMap: 'playEventPlayedCard',
                            values: {
                                subtype: 'Technique',
                            }
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'playEventPlayedCard',
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
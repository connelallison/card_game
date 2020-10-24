import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'TheodoraTrigger',
    name: {
        english: `Theodora Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `Before another friendly Woman dies, restore it to full Health and return it to your hand.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'beforeDeath',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isCategory',
                            targetMap: 'deathEventDestroyedTarget',
                            values: {
                                category: 'Woman',
                            }
                        },
                        {
                            eventTargetRequirement: 'isNotSelf',
                            targetMap: 'deathEventDestroyedTarget',
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'deathEventDestroyedTarget',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'deathEventDestroyedTarget',
                            operation: 'heal',
                            values: {
                                numberMap: 'missingHealth'
                            },
                        },
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'deathEventDestroyedTarget',
                            operation: 'moveZone',
                            values: {
                                zone: 'hand',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class TheodoraTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default TheodoraTrigger
import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'HenryVIIIMoreWivesYourGraceTrigger',
    name: {
        english: `"More Wives, Your Grace?" Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After a friendly Woman dies, pay (1) and draw a Woman.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterDeath',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'deathEventDestroyedTarget',
                        },
                        {
                            eventTargetRequirement: 'isType',
                            targetMap: 'deathEventDestroyedTarget',
                            values: {
                                type: 'Follower',
                            }
                        },
                        {
                            eventTargetRequirement: 'isCategory',
                            targetMap: 'deathEventDestroyedTarget',
                            values: {
                                category: 'Woman',
                            }
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'spendMoney',
                            values: {
                                money: 1,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                targetRequirements: [
                                    {
                                        targetRequirement: 'isType',
                                        values: {
                                            type: 'Follower',
                                        }
                                    },
                                    {
                                        targetRequirement: 'isCategory',
                                        values: {
                                            category: 'Woman',
                                        }
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class HenryVIIIMoreWivesYourGraceTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HenryVIIIMoreWivesYourGraceTrigger
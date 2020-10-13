import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'LudwigIITrigger',
    name: {
        english: `Ludwig II Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After you overheal your leader, gain Armour equal to the overhealing.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterOverhealing',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isDynamicTarget',
                            targetMap: 'healingEventHealedTarget',
                            values: {
                                dynamicTarget: {
                                    valueType: 'target',
                                    from: 'targetDomain',
                                    targetDomain: 'friendlyLeader',
                                }
                            },
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'healingEventCharSource',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'gainArmour',
                            values: {
                                armour: {
                                    valueType: 'number',
                                    from: 'event',
                                    numberMap: 'healEventOverhealing',
                                    event: {
                                        valueType: 'event',
                                        from: 'actionEventEvent',
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class LudwigIITrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default LudwigIITrigger
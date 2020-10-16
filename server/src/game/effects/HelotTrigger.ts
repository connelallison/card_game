import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'HelotTrigger',
    name: {
        english: `Helot Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `If most of your followers are Helots, the Helots attack you and flee.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterAuraUpdate',
            actionSteps: [
                {
                    requirements: [
                        {
                            customRequirement: {
                                valueType: 'boolean',
                                from: 'number',
                                operator: 'greaterThan',
                                comparison: {
                                    valueType: 'number',
                                    from: 'targets',
                                    numberMap: 'count',
                                    targets: {
                                        valueType: 'targets',
                                        from: 'targetDomain',
                                        targetDomain: 'friendlyBoard',
                                        requirements: [
                                            {
                                                targetRequirement: 'isNotSpecificCardClass',
                                                values: {
                                                    cardID: 'Helot',
                                                }
                                            },
                                        ],
                                    }
                                },
                                number: {
                                    valueType: 'number',
                                    from: 'targets',
                                    numberMap: 'count',
                                    targets: {
                                        valueType: 'targets',
                                        from: 'targetDomain',
                                        targetDomain: 'friendlyBoard',
                                        requirements: [
                                            {
                                                targetRequirement: 'isSpecificCardClass',
                                                values: {
                                                    cardID: 'Helot',
                                                }
                                            },
                                        ],
                                    }
                                },
                            }
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'forceAttack',
                            values: {
                                attackTarget: {
                                    valueType: 'target',
                                    from: 'targetDomain',
                                    targetDomain: 'friendlyLeader',
                                }
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'banish',
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'friendlyBoard',
                                requirements: [
                                    {
                                        targetRequirement: 'isSpecificCardClass',
                                        values: {
                                            cardID: 'Helot',
                                        }
                                    },
                                ],
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class HelotTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HelotTrigger
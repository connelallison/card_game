import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'StatueOfLibertyTrigger',
    name: {
        english: `Statue of Liberty Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `If you have no followers at the start of your turn, this loses a charge.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: true,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'startOfTurn',
            actionSteps: [
                {
                    actionFunctions: [],
                    requirements: [
                        {
                            activeRequirement: 'isMyTurn'
                        },
                        {
                            customRequirement: {
                                valueType: 'boolean',
                                from: 'number',
                                comparison: 0,
                                operator: 'equals',
                                number: {
                                    valueType: 'number',
                                    from: 'targets',
                                    numberMap: 'count',
                                    targets: {
                                        valueType: 'targets',
                                        from: 'targetDomain',
                                        targetDomain: 'friendlyBoard',
                                    }
                                }
                            }
                        },
                    ]
                },
            ],
        },
    ],
}

class StatueOfLibertyTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default StatueOfLibertyTrigger
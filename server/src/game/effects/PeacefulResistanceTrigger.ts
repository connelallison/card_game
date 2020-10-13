import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'PeacefulResistanceTrigger',
    name: {
        english: `Peaceful Resistance Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `Passive: If your followers don't attack, they restore Health to your Leader equal to their Attack.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'endOfTurn',
            actionSteps: [
                {
                    requirements: [
                        {
                            activeRequirement: 'isMyTurn',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'heal',
                            values: {
                                healing: {
                                    valueType: 'number',
                                    from: 'numbers',
                                    reducer: 'sum',
                                    numbers: {
                                        valueType: 'numbers',
                                        from: 'targets',
                                        numberMap: 'attack',
                                        targets: {
                                            valueType: 'targets',
                                            from: 'targetDomain',
                                            targetDomain: 'friendlyBoard',
                                            requirements: [
                                                {
                                                    targetRequirement: 'hasAttack'
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'friendlyLeader',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class PeacefulResistanceTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default PeacefulResistanceTrigger
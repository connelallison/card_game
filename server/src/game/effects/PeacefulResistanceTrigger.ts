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
            english: `Passive: After a friendly character doesn't use their attack, Nourish 1 Health to them.`,
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
                                healing: 1,
                                nourish: true,
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyLeader', 'friendlyBoard'],
                                requirements: [
                                    {
                                        targetRequirement: 'hasAttack',
                                    },
                                ]
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
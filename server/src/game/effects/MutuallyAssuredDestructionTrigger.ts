import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'MutuallyAssuredDestructionTrigger',
    name: {
        english: `Mutually Assured Destruction Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After a leader attacks, they take 60 Rot damage. Then, their opponent takes 60 Rot damage.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterAttack',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isType',
                            targetMap: 'attackEventAttacker',
                            values: {
                                type: 'Leader',
                            }
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'attackEventAttacker',
                            operation: 'damage',
                            values: {
                                damage: 60,
                                rot: true,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'forceDeathPhase',
                        },
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'attackEventAttacker',
                            extraTargets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'enemyLeader',
                            },
                            onlyExtraTargets: true,
                            operation: 'damage',
                            values: {
                                damage: 60,
                                rot: true,
                            },
                        },
                    ],

                },
            ],
        },
    ],
}

class MutuallyAssuredDestructionTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default MutuallyAssuredDestructionTrigger
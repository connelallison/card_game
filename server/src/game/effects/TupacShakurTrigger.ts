import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'TupacShakurTrigger',
    name: {
        english: `Tupac Shakur Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After a friendly follower is attacked and killed, its adjacents retaliate.`,
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
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'attackEventDefender',
                        },
                        {
                            eventTargetRequirement: 'isDestroyed',
                            targetMap: 'attackEventDefender',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            operation: 'storeTargets',
                            targetMap: 'attackEventAttacker',
                            values: {
                                param: 'attacker'
                            },
                        },
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'attackEventDefender',
                            extraTargets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'adjacentFollowers',
                            },
                            onlyExtraTargets: true,
                            operation: 'forceAttack',
                            values: {
                                attackTarget: {
                                    valueType: 'target',
                                    from: 'stored',
                                    param: 'attacker'
                                }
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'forceDeathPhase',
                        },
                    ],
                },
            ],
        },
    ],
}

class TupacShakurTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default TupacShakurTrigger
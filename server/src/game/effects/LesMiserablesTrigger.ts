import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'LesMiserablesTrigger',
    name: {
        english: `Les Miserables Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    activeTypes: 'Persistent',
    text: {
        templates: {
            english: `After a friendly follower dies during your opponent's turn, gain Fervour 1.`,
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
                            activeRequirement: 'isNotMyTurn'
                        },
                        {
                            eventTargetRequirement: 'isType',
                            values: {
                                type: 'Follower',
                            },
                            targetMap: 'deathEventDestroyedTarget',
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'deathEventDestroyedTarget',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'addStatEffect',
                            values: {
                                statEffectID: 'Fervour',
                                statValue: 1,
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'self',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class LesMiserablesTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default LesMiserablesTrigger
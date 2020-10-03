import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'SavageWolfTrigger',
    name: {
        english: `Savage Wolf Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `After a friendly follower dies, gain +2/+1.`,
        },
    },
    activeTypes: ['Follower'],
    activeZones: ['board'],
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'afterDeath',
        actionSteps: [{
            requirements: [
                {
                    eventTargetRequirement: 'isType',
                    values: {
                        type: 'Follower'
                    },
                    targetMap: 'deathEventDestroyedTarget'
                },
                {
                    eventTargetRequirement: 'isFriendly',
                    targetMap: 'deathEventDestroyedTarget'
                }
            ],
            autoTargets: [{
                targets: {
                    valueType: 'target',
                    from: 'targetDomain',
                    targetDomain: 'self'
                },
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'buffAttackAndHealth',
                values: {
                    attack: 2,
                    health: 1,
                },
            }]
        }]
    }]
}

class SavageWolfTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SavageWolfTrigger
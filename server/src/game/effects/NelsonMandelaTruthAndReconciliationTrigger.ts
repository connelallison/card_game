import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'NelsonMandelaTruthAndReconciliationTrigger',
    name: {
        english: `Truth and Reconciliation`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After a character doesn't use their attack, give them +1 Health.`,
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
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'buffHealth',
                            values: {
                                health: 1,
                                buffName: { english: 'Truth And Reconciliation Buff' },
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyLeader', 'friendlyBoard', 'enemyLeader', 'enemyBoard'],
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

class NelsonMandelaTruthAndReconciliationTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default NelsonMandelaTruthAndReconciliationTrigger
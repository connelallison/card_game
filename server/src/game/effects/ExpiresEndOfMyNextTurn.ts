import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'ExpiresEndOfMyNextTurn',
    name: {
        english: `Expires End Of My Next Turn`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: { templates: { english: `Expires at the end of my next turn.` } },
    repeatable: true,
    wonderTrigger: false,
    activeTypes: ['Effect'],
    memory: { counter: 2 },
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'endOfTurn',
        actionSteps: [{
            requirements: [{
                activeRequirement: "isMyTurn"
            }],
            actionFunctions: [
                {
                    functionType: 'autoAction',
                    operation: 'modRememberedNumber',
                    values: {
                        param: 'counter',
                        number: -1,
                    },
                },
                {
                    functionType: 'autoAction',
                    operation: 'effectExpiry',
                    runRequirements: [
                        {
                            customRequirement: {
                                valueType: 'boolean',
                                from: 'number',
                                comparison: 0,
                                operator: 'equalLessThan',
                                number: {
                                    valueType: 'number',
                                    from: 'memory',
                                    param: 'counter'
                                }
                            }
                        },
                    ]
                },
            ]
        }]
    }]
}

class ExpiresEndOfMyNextTurn extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ExpiresEndOfMyNextTurn
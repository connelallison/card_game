import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'DavidHumeOrganiseThoughtsTrigger',
    name: {
        english: `Organise Thoughts Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `At the end of your turn, draw this.`,
        },
        dynamicValues: [],
    },
    repeatable: false,
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
                            operation: 'draw',
                            values: {
                                targetRequirements: [{
                                    targetRequirement: 'isDynamicTarget',
                                    values: {
                                        dynamicTarget: {
                                            valueType: 'target',
                                            from: 'targetDomain',
                                            targetDomain: 'self',
                                        }
                                    }
                                },]
                            },
                        },
                    ],
                    requirements: [
                        {
                            activeRequirement: 'isMyTurn'
                        },
                    ]
                },
            ],
        },
    ]
}

class DavidHumeOrganiseThoughtsTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default DavidHumeOrganiseThoughtsTrigger
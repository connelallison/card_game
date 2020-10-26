import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'CharlesPonziTrigger',
    name: {
        english: `Charles Ponzi Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `If you play this card this turn, draw a more expensive card and give it this effect.`,
        },
        dynamicValues: [],
    },
    repeatable: false,
    wonderTrigger: false,
    expires: ['ExpiresEndOfMyTurn'],
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'beforePlay',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isSelf',
                            targetMap: 'playEventPlayedCard',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                targetRequirements: [
                                    {
                                        targetRequirement: 'valGreater',
                                        values: {
                                            param: 'cost',
                                            number: {
                                                valueType: 'number',
                                                from: 'target',
                                                numberMap: 'cost',
                                                target: {
                                                    valueType: 'target',
                                                    from: 'self',
                                                }
                                            }
                                        }
                                    },
                                ],
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'CharlesPonziTrigger',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'stored',
                                param: 'drawnCards',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class CharlesPonziTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default CharlesPonziTrigger
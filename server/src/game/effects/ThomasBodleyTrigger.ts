import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'ThomasBodleyTrigger',
    name: {
        english: `Thomas Bodley Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After you equip a creation for the first time each turn, add a copy to your hand.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterPlay',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isType',
                            values: {
                                type: 'Creation'
                            },
                            targetMap: 'playEventPlayedCard',
                        },
                        {
                          eventTargetRequirement: 'isFriendly',
                          targetMap: 'playEventPlayer',
                        },
                        {
                            customRequirement: {
                                valueType: 'boolean',
                                from: 'number',
                                comparison: 1,
                                operator: 'equals',
                                number: {
                                    valueType: 'number',
                                    from: 'targets',
                                    numberMap: 'count',
                                    targets: {
                                        valueType: 'targets',
                                        from: 'events',
                                        targetMap: 'playEventPlayedCard',
                                        requirements: [
                                            {
                                                targetRequirement: 'isType',
                                                values: {
                                                    type: 'Creation'
                                                }
                                            },
                                        ],
                                        events: {
                                            valueType: 'events',
                                            from: 'eventDomain',
                                            eventDomain: 'playEvents',
                                            requirements: [
                                                {
                                                    eventRequirement: 'thisTurn'
                                                },
                                            ]
                                        }

                                    }
                                }
                            }
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'playEventPlayedCard',
                            operation: 'createAndStoreCopy',
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'moveZone',
                            values: {
                                zone: 'hand',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'stored',
                                param: 'copiedCards'
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class ThomasBodleyTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ThomasBodleyTrigger
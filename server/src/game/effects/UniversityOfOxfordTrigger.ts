import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'UniversityOfOxfordTrigger',
    name: {
        english: `University of Oxford Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `After you draw a famous follower, give followers in your hand +1/+1.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: true,
    activeZones: 'inPlay',
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterDraw',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'buffStats',
                            values: {
                                stats: 1,
                                effectName: { english: 'University of Oxford Buff' },
                            },
                        },
                    ],
                    autoTargets: [{
                        targets: {
                            valueType: 'targets',
                            from: 'targetDomain',
                            targetDomain: 'friendlyHand',
                            requirements: [
                                {
                                  targetRequirement: 'isType',
                                  values: {
                                      type: 'Follower',
                                  }
                                },
                            ],
                        },
                    }],
                    requirements: [
                        {
                            eventTargetRequirement: 'isSubtype',
                            targetMap: 'drawEventDrawnCard',
                            values: {
                                subtype: 'Famous',
                            }
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'drawEventDrawnCard',
                        },
                    ],
                },
            ],
        },
    ]
}

class UniversityOfOxfordTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default UniversityOfOxfordTrigger
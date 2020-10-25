import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'ThrillOfDiscoveryTrigger',
    name: {
        english: `Thrill of Discovery Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `Passive: Before you play a famous follower from the far left or right of your hand, give it +1/+1.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'beforePlay',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            operation: 'buffStats',
                            values: {
                                stats: 0.5,
                                effectName: { english: 'Thrill of Discovery Buff' },
                            },
                            targetMap: 'playEventPlayedCard'
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'playEventPlayedCard'
                        },
                        {
                            eventTargetRequirement: 'isSubtype',
                            targetMap: 'playEventPlayedCard',
                            values: {
                                subtype: 'Famous',
                            }
                        },
                        {
                            eventRequirement: 'isEureka'
                        },
                    ],
                },
            ],
        },
    ],
}

class ThrillOfDiscoveryTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ThrillOfDiscoveryTrigger
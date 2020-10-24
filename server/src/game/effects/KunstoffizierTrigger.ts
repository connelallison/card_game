import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'KunstoffizierTrigger',
    name: {
        english: `Kunstoffizier Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    activeTypes: ['Follower'],
    text: {
        templates: {
            english: `After you discard a card, gain +1/+1.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterDiscard',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'discardEventDiscardedCard'
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'buffStats',
                            values: {
                                stats: 1,
                                buffName: { english: 'Kunstoffizier Buff' }
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'self',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class KunstoffizierTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default KunstoffizierTrigger
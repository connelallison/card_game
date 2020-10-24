import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'GulagTrigger',
    name: {
        english: `Gulag Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After you discard a card, summon a 0/2 Prisoner.`,
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
                            operation: 'createAndSummonCard',
                            values: {
                                cardID: 'Prisoner',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

class GulagTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default GulagTrigger
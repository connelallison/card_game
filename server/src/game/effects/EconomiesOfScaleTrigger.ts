import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'EconomiesOfScaleTrigger',
    name: {
        english: `Economies of Scale Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After you play a card, cards in your hand cost (0.1) less this game.`,
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
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'playEventPlayer',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'EconomiesOfScaleAura'
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

class EconomiesOfScaleTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default EconomiesOfScaleTrigger
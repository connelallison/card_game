import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'AneurinBevanTrigger',
    name: {
        english: `Aneurin Bevan Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `At the end of your turn, Nourish Health to your leader equal to your unspent Money.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'endOfTurn',
            actionSteps: [
                {
                    requirements: [
                        {
                            activeRequirement: 'isMyTurn',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'heal',
                            values: {
                                healing: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'ownerMoney',
                                    target: {
                                        valueType: 'target',
                                        from: 'self',
                                    }
                                },
                                nourish: true,
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'friendlyLeader',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class AneurinBevanTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default AneurinBevanTrigger
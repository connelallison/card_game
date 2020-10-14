import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'SubprimeBorrowerTrigger',
    name: {
        english: `Subprime Borrower Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `At the start of your turn, gain Rent 1.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'startOfTurn',
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
                            operation: 'addStatEffect',
                            values: {
                                statEffectID: 'Rent',
                                statValue: 1,
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

class SubprimeBorrowerTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SubprimeBorrowerTrigger
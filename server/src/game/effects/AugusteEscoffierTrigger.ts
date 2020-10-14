import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'AugusteEscoffierTrigger',
    name: {
        english: `Auguste Escoffier Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: ['deck'],
    activeTypes: ['Follower'],
    text: {
        templates: {
            english: `Deck: At the end of your turn, gain +2/+2.`,
        },
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
                            operation: 'buffStats',
                            values: {
                                stats: 2,
                                buffName: { english: 'Auguste Escoffier Buff' },
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

class AugusteEscoffierTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default AugusteEscoffierTrigger
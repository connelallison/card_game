import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'VenetianPatentStatuteTrigger',
    name: {
        english: `Venetian Patent Statute Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `Before you play a Technique, give it Immune until the end of your next turn.`,
        },
    },
    repeatable: true,
    wonderTrigger: true,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'beforePlay',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'targetMapAction',
                            targetMap: 'playEventPlayedCard',
                            operation: 'addEffect',
                            values: {
                                effectID: 'Immune',
                                expires: ['ExpiresEndOfMyNextTurn'],
                                buffName: { english: 'Venetian Patent Statute Buff' },
                            }
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isSubtype',
                            targetMap: 'playEventPlayedCard',
                            values: {
                                subtype: 'Technique',
                            }
                        },
                    ]
                },
            ],
        },
    ],
}

class VenetianPatentStatuteTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default VenetianPatentStatuteTrigger
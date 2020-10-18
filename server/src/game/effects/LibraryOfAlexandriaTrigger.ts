import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'LibraryOfAlexandriaTrigger',
    name: {
        english: `Library of Alexandria Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `After you play a work or technique, draw a card.`,
        },
    },
    repeatable: true,
    wonderTrigger: true,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterPlay',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'draw',
                        },
                    ],
                    requirements: [
                        {
                            eventTargetRequirement: 'isSubtypes',
                            targetMap: 'playEventPlayedCard',
                            values: {
                                subtypes: ['Technique', 'Work'],
                            }
                        },
                        {
                          eventTargetRequirement: 'isFriendly',
                          targetMap: 'playEventPlayedCard',
                        },
                    ]
                },
            ],
        },
    ],
}

class LibraryOfAlexandriaTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default LibraryOfAlexandriaTrigger
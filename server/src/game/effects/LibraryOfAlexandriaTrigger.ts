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
            english: `After your opponent plays a leftmost or rightmost card, this wonder loses a charge.`,
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
                  actionFunctions: [],
                  requirements: [
                      {
                        eventRequirement: 'isEureka',
                      },
                      {
                        eventTargetRequirement: 'isEnemy',
                        targetMap: 'playEventPlayer',
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
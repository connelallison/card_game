import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'GrandeArmeeTrigger',
    name: {
        english: `Grande Armée Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `Passive: You have 10 board slots.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
                actionType: 'triggerAction',
                eventType: 'startOfGame',
                actionSteps: [
                    {
                      actionFunctions: [
                          {
                            functionType: 'autoAction',
                            operation: 'setMaxBoardSlots',
                            values: {
                                number: 10,
                            },
                          },
                      ],
                    },
                ],
        },
    ],
}

class GrandeArmeeTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default GrandeArmeeTrigger
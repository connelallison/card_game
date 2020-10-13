import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'TwelveTablesTrigger',
    name: {
        english: `Twelve Tables Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `After you draw a follower, summon two 1/1 Citizens.`,
        },
    },
    repeatable: true,
    wonderTrigger: true,
    activeZones: 'inPlay',
    activeTypes: 'Persistent',
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'afterDraw',
        actionSteps: [{
            requirements: [
                {
                    activeRequirement: 'canSummonType',
                    values: {
                        type: 'Follower',
                    }
                },
                {
                    eventTargetRequirement: 'isType',
                    values: {
                        type: 'Follower'
                    },
                    targetMap: 'drawEventDrawnCard'
                },
                {
                    eventTargetRequirement: 'isFriendly',
                    targetMap: 'drawEventDrawnCard'
                }
            ],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'createAndSummonCard',
                values: {
                    cardID: 'Citizen',
                    number: 2,
                }
            }]
        }]
    }]
}

class TwelveTablesTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default TwelveTablesTrigger
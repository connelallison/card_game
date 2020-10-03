import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'KnightAcademyTrigger',
    name: {
        english: `Knight Academy Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `After you draw a follower, summon a 2/2 Knight.`,
        },
    },
    repeatable: true,
    wonderTrigger: true,
    activeZones: ['creationZone'],
    activeTypes: ['Creation'],
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
                    'cardID': 'Knight'
                }
            }]
        }]
    }]
}

class KnightAcademyTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default KnightAcademyTrigger
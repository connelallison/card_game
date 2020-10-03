import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'HolyBookTrigger',
    name: {
        english: `Holy Book Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: { templates: { english: `At the end of your turn, restore 2 Health to all friendly characters.` } },
    repeatable: true,
    wonderTrigger: false,
    activeZones: ['creationZone'],
    activeTypes: ['Creation'],
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'endOfTurn',
        actionSteps: [{
            requirements: [{
                activeRequirement: 'isMyTurn'
            }],
            autoTargets: [{
                targets: {
                    valueType: 'targets',
                    from: 'targetDomain',
                    targetDomain: ['friendlyBoard', 'friendlyLeader']
                }
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'heal',
                values: {
                    'healing': 2,
                },
            }]
        }]
    }]
}

class HolyBookTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HolyBookTrigger
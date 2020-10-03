import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'OrpheusTrigger',
    name: {
        english: `Orpheus Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
          english: `At the start of your turn, resurrect $0.`,
        },
        dynamicValues: [
            {
              value: {
                valueType: 'localisedString',
                from: 'target',
                target: {
                    valueType: 'target',
                    from: 'memory',
                    param: 'target',
                },
                stringMap: 'name'
              },
              default: { english: `(nothing)`},
              activeZones: ['legacy', 'board', 'hand', 'deck']
            }
          ]
      },
    activeTypes: ['Follower'],
    activeZones: ['board'],
    repeatable: false,
    wonderTrigger: false,
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'startOfTurn',
        actionSteps: [{
            requirements: [{
                activeRequirement: 'isMyTurn'
            }],
            autoTargets: [{
                targets: {
                    valueType: 'target',
                    from: 'memory',
                    param: 'target',
                },
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'resurrect',
            }]
        }]
    }]
}

class OrpheusTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default OrpheusTrigger
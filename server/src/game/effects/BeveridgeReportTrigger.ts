import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'BeveridgeReportTrigger',
    name: {
        english: `Beveridge Report Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: { templates: { english: `At the end of your turn, Nourish 1 Health to your followers.` } },
    repeatable: true,
    wonderTrigger: false,
    activeZones: 'inPlay',
    activeTypes: 'Persistent',
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
                    targetDomain: ['friendlyBoard']
                }
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'heal',
                values: {
                    healing: 1,
                    nourish: true,
                },
            }]
        }]
    }]
}

class BeveridgeReportTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default BeveridgeReportTrigger
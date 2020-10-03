import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'ExpiresStartOfMyTurn',
    name: {
        english: `Expires Start Of My Turn`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: { templates: { english: `Expires at the start of my turn.` } },
    repeatable: false,
    wonderTrigger: false,
    activeZones: ['board', 'creationZone', 'deck', 'legacy', 'hand', 'leaderTechniqueZone', 'leaderZone', 'passiveZone', 'setAsideZone', 'global'],
    activeTypes: ['Effect'],
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'startOfTurn',
        actionSteps: [{
            requirements: [{
                activeRequirement: "isMyTurn"
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'effectExpiry',
            }]
        }]
    }]
}

class ExpiresStartOfMyTurn extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ExpiresStartOfMyTurn
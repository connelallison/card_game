import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'ExpiresEndOfMyTurn',
    name: {
        english: `Expires End Of My Turn`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: { templates: { english: `Expires at the end of my turn.` } },
    repeatable: false,
    wonderTrigger: false,
    activeZones: ['board', 'creationZone', 'deck', 'legacy', 'hand', 'leaderTechniqueZone', 'leaderZone', 'passiveZone', 'setAsideZone', 'global'],
    activeTypes: ['Effect'],
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'endOfTurn',
        actionSteps: [{
            requirements: [{
                activeRequirement: "isMyTurn"
            }],
            actionFunctions: [
                {
                    functionType: 'autoAction',
                    operation: 'effectExpiry',
                }
            ]
        }]
    }]
}

class ExpiresEndOfMyTurn extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ExpiresEndOfMyTurn
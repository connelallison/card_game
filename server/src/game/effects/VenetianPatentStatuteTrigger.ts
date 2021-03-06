import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'VenetianPatentStatuteTrigger',
    name: {
        english: `Venetian Patent Statute Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: 'inPlay',
    text: {
        templates: {
            english: `Before you play a creation, give it Fortune.`,
        },
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        
    ],
}

class VenetianPatentStatuteTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default VenetianPatentStatuteTrigger
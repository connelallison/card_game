import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEnchantmentData = {
    id: 'ExpiresEndOfMyTurn',
    name: {
        english: `Expires End Of My Turn`,
    },
    type: 'Enchantment',
    subtype: 'Trigger',
    repeatable: false,
    wonderTrigger: false,
    activeZones: ['board', 'creationZone', 'deck', 'legacy', 'hand', 'leaderTechniqueZone', 'leaderZone', 'passiveZone', 'setAsideZone', 'global'],
    activeTypes: ['Enchantment'],
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
                    operation: 'enchantmentExpiry',
                }
            ]
        }]
    }]
}

class ExpiresEndOfMyTurn extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ExpiresEndOfMyTurn
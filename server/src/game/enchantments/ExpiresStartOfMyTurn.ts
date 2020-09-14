import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEnchantmentData = {
    'id': 'ExpiresStartOfMyTurn',
    'name': {
        'english': `Expires Start Of My Turn`,
    },
    'type': 'Enchantment',
    'subtype': 'Trigger',
    'repeatable': false,
    'wonderTrigger': false,
    'activeZones': ['board', 'creationZone', 'deck', 'graveyard', 'hand', 'leaderTechniqueZone', 'leaderZone', 'passiveZone', 'setAsideZone', 'global'],
    'activeTypes': ['Enchantment'],
    'triggerObjs': [{
        'actionType': 'triggerAction',
        'eventType': 'startOfTurn',
        'requirements': [{
            activeRequirement: "isMyTurn"
        }],
        'actionFunctions': [{
            functionType: 'autoAction',
            operation: 'enchantmentExpiry',
        }]
    }]
}

class ExpiresStartOfMyTurn extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default ExpiresStartOfMyTurn
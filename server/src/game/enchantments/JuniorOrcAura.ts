import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEnchantmentData = {
    'id': 'JuniorOrcAura',
    'name': {
        'english': `Junior Orc Aura`,
    },
    'type': 'Enchantment',
    'subtype': 'Aura',
    'activeZones': ['board'],
    'activeTypes': ['Follower'],
    'targetDomain': ['friendlyBoard'],
    'targetRequirements': [
        { 'targetRequirement': 'isFriendly' },
        { 'targetRequirement': 'notSelf' }
    ],
    'effectObjs': [{
        'operation': 'incrementAttack',
        'value': 1
    }],
    'priority': 1
}

class JuniorOrcAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default JuniorOrcAura
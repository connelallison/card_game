import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
import { sumFriendlyFollowersHealth } from "../dictionaries/DynamicValueShortcuts";

const data: AuraEnchantmentData = {
    'id': 'HolyProtectorsAura',
    'name': {
        'english': `Holy Protectors Aura`,
    },
    'type': 'Enchantment',
    'subtype': 'Aura',
    'activeZones': ['passiveZone'],
    'activeTypes': ['Passive'],
    'targetDomain': ['friendlyLeader'],
    'targetRequirements': [{
        'targetRequirement': 'isFriendly'
    }],
    'priority': 3,
    'effectObjs': [{
        'operation': 'incrementHealth',
        'value': sumFriendlyFollowersHealth
    }]
}

class HolyProtectorsAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default HolyProtectorsAura
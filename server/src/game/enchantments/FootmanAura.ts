import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: AuraEnchantmentData = {
    id: 'FootmanAura',
    name: {
        english: `Footman Aura`,
    },
    type: 'Enchantment',
    subtype: 'Aura',
    priority: 1,
    activeZones: ['board'],
    activeTypes: ['Follower'],
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['self'],
    },
    activeRequirements: [{
        activeRequirement: 'isMyTurn'
    }],
    effectObjs: [
        {
            operation: 'incrementAttack',
            value: 2
        }
    ],
}

class FootmanAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default FootmanAura
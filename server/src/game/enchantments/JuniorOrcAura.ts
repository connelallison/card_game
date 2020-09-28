import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEnchantmentData = {
    id: 'JuniorOrcAura',
    name: {
        english: `Junior Orc Aura`,
    },
    type: 'Enchantment',
    subtype: 'Aura',
    priority: 1,
    activeZones: ['board'],
    activeTypes: ['Follower'],
    effectObjs: [{
        operation: 'incrementAttack',
        value: 1
    }],
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard'],
        requirements: [
            { targetRequirement: 'isFriendly' },
            { targetRequirement: 'notSelf' }
        ],
    },
}

class JuniorOrcAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default JuniorOrcAura
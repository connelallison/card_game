import AuraEnchantment, { AuraEnchantmentData } from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEnchantmentData = {
    id: 'JohnTheBaptistAura',
    name: {
        english: `John the Baptist Aura`,
    },
    type: 'Enchantment',
    subtype: 'Aura',
    priority: 1,
    activeZones: ['legacy'],
    activeTypes: ['Follower'],
    effectObjs: [
        {
            operation: 'incrementAttack',
            value: 2
        },
        {
            operation: 'incrementHealth',
            value: 2
        },
    ],
    targets: {
        valueType: 'targets',
        from: 'memory',
        param: 'deathSlot',
        targetMemory: {
            valueType: 'target',
            from: 'targetDomain',
            targetDomain: 'self',
        }
    }
}

class JohnTheBaptistAura extends AuraEnchantment {
    static readonly data: AuraEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default JohnTheBaptistAura
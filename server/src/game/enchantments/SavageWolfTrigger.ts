import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEnchantmentData = {
    'id': 'SavageWolfTrigger',
    'name': {
        'english': `Savage Wolf Trigger`,
    },
    'type': 'Enchantment',
    'subtype': 'Trigger',
    activeTypes: ['Follower'],
    activeZones: ['board'],
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [{
        eventType: 'afterDeath',
        requirements: [
            {
                targetRequirement: 'isType',
                values: {
                    type: 'Follower'
                },
                targetMap: 'deathEventDestroyedTarget'
            },
            {
                targetRequirement: 'isFriendly',
                targetMap: 'deathEventDestroyedTarget'
            }
        ],
        actions: [{
            actionType: 'autoAction',
            operation: 'buffAttackAndHealth',
            values: {
                attack: 2,
                health: 1,
            },
            target: {
                valueType: 'target',
                from: 'targetDomain',
                targetDomain: 'self'
            }
        }]
    }]
}

class SavageWolfTrigger extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SavageWolfTrigger
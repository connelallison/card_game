import TriggerEnchantment from "../gameObjects/TriggerEnchantment";

class SavageWolfTrigger extends TriggerEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'SavageWolfTrigger',
            'Savage Wolf Trigger',
            ['board'],
            ['Follower'],
            [],
            true,
            [{
                eventType: 'afterDeath',
                requirements: [
                    {
                        targetRequirement: 'isType',
                        values: {
                            type: 'Follower',
                        },
                        targetMap: 'deathEventDestroyedTarget',
                    },
                    {
                        targetRequirement: 'isFriendly',
                        targetMap: 'deathEventDestroyedTarget',
                    }
                ],
                actions: [{
                    actionType: 'autoAction',
                    operation: 'buffCharacterAttack',
                    values: {
                        attack: 2,
                    },
                    target: {
                        valueType: 'target',
                        from: 'targetDomain',
                        targetDomain: 'self'
                    },
                },
                {
                    actionType: 'autoAction',
                    operation: 'buffCharacterHealth',
                    values: {
                        health: 1,
                    },
                    target: {
                        valueType: 'target',
                        from: 'targetDomain',
                        targetDomain: 'self'
                    },
                }]
            }],
            false,
        )
    }
}

export default SavageWolfTrigger

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
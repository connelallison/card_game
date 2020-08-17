import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import Unit from "../gameObjects/Unit";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import DeathEvent from "../gameEvents/DeathEvent";

class SavageWolfTrigger extends TriggerEnchantment {
    owner: Unit

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'SavageWolfTrigger', 
            'Savage Wolf Trigger', 
            ['board'],
            ['Unit'],
            [],
            true,
            [{
                eventType: 'afterDeath',
                requirements: [
                    {
                        targetRequirement: 'isType',
                        values: {
                            type: 'Unit',
                        },
                        eventMap: (event: DeathEvent) => event.died,
                    },
                    {
                        targetRequirement: 'isFriendly',
                        eventMap: (event: DeathEvent) => event.died,
                    }
                ],
                actions: [{
                        operation: 'buffCharacterAttackAndHealth',
                        values: {
                            stats: 1,
                        },
                        targets: 'self',
                }]
            }]
        )
    }
}

export default SavageWolfTrigger
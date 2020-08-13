import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import Unit from "../gameObjects/Unit";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import TriggerActions from "../dictionaries/TriggerActions";

class SavageWolfTrigger extends TriggerEnchantment {
    owner: Unit

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'SavageWolf:Trigger', 
            'Savage Wolf Trigger', 
            ['board'],
            ['Unit'],
            [],
            true,
            ['afterDeath'],
            [{
                eventType: 'afterDeath',
                requirements: [TriggerRequirements.isType('Unit', 'object'), TriggerRequirements.isFriendly('object')],
                actions: [TriggerActions.buffCharOwnerAttackAndHealth(1, 1)]
            }]
        )
    }
}

export default SavageWolfTrigger
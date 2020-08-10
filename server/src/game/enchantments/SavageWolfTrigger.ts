import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";
import Unit from "../gameObjects/Unit";
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
            ['unit'],
            [],
            true,
            ['afterDeath'],
            [{
                eventType: 'afterDeath',
                requirements: [TriggerRequirements.isUnit('object'), TriggerRequirements.isFriendly('object')],
                actions: [TriggerActions.buffCharOwnerAttackAndHealth(1, 1)]
            }]
        )
    }
}

export default SavageWolfTrigger
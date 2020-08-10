import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";
import Minion from "../gameObjects/Minion";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import TriggerActions from "../dictionaries/TriggerActions";

class SavageWolfTrigger extends TriggerEnchantment {
    owner: Minion

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'SavageWolf:Trigger', 
            'Savage Wolf Trigger', 
            ['board'],
            ['minion'],
            [],
            true,
            ['afterDeath'],
            [{
                eventType: 'afterDeath',
                requirements: [TriggerRequirements.isMinion('object'), TriggerRequirements.isFriendly('object')],
                actions: [TriggerActions.buffCharOwnerAttackAndHealth(1, 1)]
            }]
        )
    }
}

export default SavageWolfTrigger
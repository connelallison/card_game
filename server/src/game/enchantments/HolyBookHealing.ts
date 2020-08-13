import Game from "../gameSystems/Game";
import WorkCreation from "../gameObjects/WorkCreation";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerActions from "../dictionaries/TriggerActions";
import TriggerRequirements from "../dictionaries/TriggerRequirements";

class HolyBookHealing extends TriggerEnchantment {
    owner: WorkCreation
    constructor(game: Game, owner: WorkCreation) {
        super(
            game,
            owner,
            'HolyBook:Healing',
            'Holy Book Healing',
            ['creationZone'],
            ['Creation'],
            [],
            true,
            ['endOfTurn'],
            [{
                eventType: 'endOfTurn',
                requirements: [TriggerRequirements.isMyTurn()],
                actions: [TriggerActions.healFriendlyCharacters(2)],
            }]
        )
    }
}

export default HolyBookHealing
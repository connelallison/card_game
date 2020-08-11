import Game from "../gameSystems/Game";
import Creation from "../gameObjects/Creation";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerActions from "../dictionaries/TriggerActions";
import TriggerRequirements from "../dictionaries/TriggerRequirements";

class HolyBookHealing extends TriggerEnchantment {
    constructor(game: Game, owner: Creation) {
        super(
            game,
            owner,
            'HolyBook:Healing',
            'Holy Book Healing',
            ['creations'],
            ['creation'],
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
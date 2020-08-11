import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import Unit from "../gameObjects/Unit";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import TriggerActions from "../dictionaries/TriggerActions";

class KnightAcademyTrigger extends TriggerEnchantment {
    owner: Unit

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'KnightAcademy:Trigger', 
            'Knight Academy Trigger', 
            ['creations'],
            ['creation'],
            [],
            true,
            ['afterDraw'],
            [{
                eventType: 'afterDraw',
                requirements: [TriggerRequirements.canSummonType('unit'), TriggerRequirements.isType('unit', 'card'), TriggerRequirements.isFriendly('card')],
                actions: [TriggerActions.summonSpecificCard('Knight')]
            }]
        )
    }
}

export default KnightAcademyTrigger
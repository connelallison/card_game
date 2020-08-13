import Game from "../gameSystems/Game";
import WonderTriggerEnchantment from "../gameObjects/WonderTriggerEnchantment";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import TriggerActions from "../dictionaries/TriggerActions";
import WonderCreation from "../gameObjects/WonderCreation";

class KnightAcademyTrigger extends WonderTriggerEnchantment {
    owner: WonderCreation

    constructor(game: Game, owner: WonderCreation) {
        super(
            game,
            owner,
            'KnightAcademy:Trigger', 
            'Knight Academy Trigger', 
            ['creationZone'],
            ['Creation'],
            [],
            true,
            ['afterDraw'],
            [{
                eventType: 'afterDraw',
                requirements: [TriggerRequirements.canSummonType('Unit'), TriggerRequirements.isType('Unit', 'card'), TriggerRequirements.isFriendly('card')],
                actions: [TriggerActions.summonSpecificCard('Knight')]
            }]
        )
    }
}

export default KnightAcademyTrigger